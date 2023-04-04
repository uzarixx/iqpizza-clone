import { FC, useEffect, useState } from 'react';
import styles from './OrderPopup.module.scss';
import PopupLayout from '../../layouts/popupLayout';
import { useAnimationPopup } from '../../../hooks/useAnimationPopup';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setOrderPopup } from '../../../store/counter/popupSlice';
import Close from '../../ui/icons/Close';
import OrderFetchService from '../../../services/http/orderFetchService';
import { date } from '../../../utils/date';
import PrimaryButton from '../../ui/buttons/primaryButton';
import RepeatOrderPopup from '../repeatOrderPopup';
import { IOrder } from '../../../constants/types';


const fetchOrder = async (id: number) => {
  const { data } = await OrderFetchService.getById(id);
  return data;
};
const OrderPopup: FC = () => {
  const [repeatActive, setRepeatActive] = useState(false);
  const dispatch = useAppDispatch();
  const [order, setOrder] = useState<IOrder>({
    order: { orderPrice: 0, id: 0, status: '', createdAt: '', isDelivery: false, address: '' },
    orderMenu: [{ count: 0, pizza: { name: '', price: 0 }, productsAttributes: [{ name: '', price: 0 }] }],
  });
  const orderPopup = useAppSelector((root) => root.popupSlice.orderPopup);
  const { active, onClosePopup } = useAnimationPopup({
    isActive: orderPopup.active, closeDispatch: () => {
      dispatch(setOrderPopup({ orderId: 0, active: false }))
    },
  });
  const onClickOrderRepeat = (val: boolean) => () => {
    setRepeatActive(val);
  };
  useEffect(() => {
    fetchOrder(orderPopup.orderId).then((r) => setOrder(r));
  }, [orderPopup.orderId]);
  return (
    <PopupLayout active={active} onClosePopup={onClosePopup}>
      <div onMouseDown={(e) => e.stopPropagation()}>
          <RepeatOrderPopup
            isActive={repeatActive}
            order={order}
            closeDispatch={onClickOrderRepeat(false)}
          />
      </div>
      <div
        className={`${styles.orderPopup} ${active && styles.activeOrderPopup}`}
        onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.head}>
          <p>Деталі замовлення</p>
          <span onClick={onClosePopup}>
          <Close />
          </span>
        </div>
        <div className={styles.mainInfo}>
          <p
            className={styles.orderAddressHead}>{order.order.isDelivery ? 'Доставка на' : 'IQ Pizza на'} {order.order.address}</p>
          <p className={styles.orderAddressUnder}>вул. {order.order.address}</p>
          <div className={styles.startWrapper}>
            <p>№ {order.order.id}</p>
            <p>{order.order.status}</p>
          </div>
          <ul>
            <li><span>Дата замовлення</span> <p>{date(order.order.createdAt)}</p></li>
            <li><span>Кількість персон</span> <p>1</p></li>
            <li><span>Спосіб оплати</span> <p>Готівка</p></li>
          </ul>
        </div>
        <div className={styles.productsWrapperMain}>
          <p className={styles.title}>Ваше замовлення:</p>
          <div className={styles.scrollWrapper}>
            {order.orderMenu.map((el, i) =>
              <div className={styles.productWrapper} key={i}>
                <p className={styles.pizzaName}>{el.pizza.name}</p>
                {el.productsAttributes.length ? <ul>
                  {el.productsAttributes.map((el, i) =>
                    <li key={i}>1x {el.name}</li>,
                  )}
                </ul> : <></>}
                <span className={styles.priceValue}>
                  <p>Сума</p>
                  <span>{el.productsAttributes.map((el) => el.price).reduce((p, c) => p + c, el.pizza.price) * el.count} ₴</span>
                </span>
              </div>,
            )}
          </div>
        </div>
        <div className={styles.bottomOrder}>
          <span><span>Разом:</span> <p>{order.order.orderPrice} ₴</p> </span>
          <PrimaryButton isDefault={true} onClick={onClickOrderRepeat(true)}>Повторити замовлення</PrimaryButton>
        </div>
      </div>
    </PopupLayout>
  );
};

export default OrderPopup;