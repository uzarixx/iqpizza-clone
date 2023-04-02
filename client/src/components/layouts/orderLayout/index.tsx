import { FC, useEffect, useState } from 'react';
import styles from './OrderLayout.module.scss';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '../../ui/inputs/formInput';
import Checkbox from '../../ui/inputs/checkbox';
import { Link, useNavigate } from 'react-router-dom';
import CheckPoint from '../../ui/icons/CheckPoint';
import OrderSummaryCard from '../../ui/cards/orderSummaryCard';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import Textarea from '../../ui/inputs/textarea';
import { orderValidation } from '../../../utils/validation/orderValidation';
import OrderFetchService from '../../../services/http/orderFetchService';
import { setCart } from '../../../store/counter/cartSlice';
import { fetchUser } from '../../../store/counter/userSlice';


interface IForm {
  name: string;
  phoneNumber: string;
  userAmount: string;
  comment: string;
}

const OrderLayout: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cart = useAppSelector((root) => root.cartSlice.cart);
    const user = useAppSelector((root) => root.userSlice.user);
    const address = localStorage.getItem('address');
    const isDelivery = localStorage.getItem('isDelivery');
    const [rules, setRules] = useState(true);
    const methods = useForm<IForm>({
      resolver: yupResolver(orderValidation),
    });
    useEffect(() => {
      if (!user) {
        dispatch(fetchUser());
      } else {
        methods.setValue('phoneNumber', user.user.phoneNumber);
        methods.setValue('name', user.user.name);
      }
    }, [user]);
    const onSubmit: SubmitHandler<IForm> = async (props) => {
      try {
        await OrderFetchService.createOrder(props.name, Number(props.userAmount), props.comment, props.phoneNumber, String(isDelivery), String(address), String(address), cart);
        navigate('/');
        dispatch(setCart([]));
        localStorage.setItem('cart', JSON.stringify([]));
      } catch (e) {
        console.log(e);
      }
    };
    return (
      <div className={styles.orderWrapper}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <div className={styles.left}>
              <section className={styles.contact}>
                <h3>Контакти</h3>
                <FormInput
                  name={'name'}
                  placeholder={'Введіть ваше ім\'я'}
                  title={'Ваше ім\'я*'}
                  error={methods.formState.errors} />
                <FormInput
                  name={'phoneNumber'}
                  placeholder={'Введіть телефон'}
                  title={'Телефон*'}
                  error={methods.formState.errors} />
                <div className={styles.rules}>
                  <Checkbox setChecked={setRules} isActive={rules} />
                  <span className={styles.text}>
                Згоден, з правилами
                <Link to={'https://www.eatery.club/privacy_policy.pdf'}>обробки персональних даних</Link>
              </span>
                </div>
                <p>Ваш номер після замовлення буде автоматично занесений в нашу базу.</p>
              </section>
              <section className={styles.address}>
                <h3>Спосіб отримання замовлення</h3>
                <div className={styles.input}>
                  <p>Спосіб отримання*</p>
                  <span><CheckPoint /> {isDelivery === 'true' ? 'Доставка, вулиця' : 'Самовивіз, IQ Pizza на'} {address}</span>
                </div>
              </section>
              <section className={styles.countMoney}>
                <h3>Спосіб оплати</h3>
                <FormInput name={'userAmount'} placeholder={'Підготувати решту з'} title={'Підготувати решту з'}
                           error={methods.formState.errors} />
              </section>
              <section className={styles.comment}>
                <h3>Коментар до замовлення</h3>
                <Textarea name={'comment'} placeholder={'Коментар'} />
              </section>

            </div>
            <div className={styles.orderSummary}>
              <OrderSummaryCard cart={cart} />
            </div>
          </FormProvider>
        </form>
      </div>
    );
  }
;

export default OrderLayout;