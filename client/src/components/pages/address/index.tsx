import { FC, useState } from 'react';
import styles from './Address.module.scss';
import Select from '../../ui/selects/citySelect';
import RestaurantSelect from '../../ui/selects/restaurantSelect';
import CheckPoint from '../../ui/icons/CheckPoint';
import PrimaryButton from '../../ui/buttons/primaryButton';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import { fetchRestaurant, setAddress, setDelivery, setRestaurantValueId } from '../../../store/counter/visualSlice';

const Address: FC = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [addressValue, setAddressValue] = useState('');
  const [restaurantId, setRestaurantId] = useState(0);
  const [city, setCity] = useState('');
  const [isDelivery, setIsDelivery] = useState(true);
  const onClickType = (type: boolean) => () => {
    setIsDelivery(type);
    setAddressValue('');
  };
  const onSubmit = () => {
    localStorage.setItem('address', addressValue);
    localStorage.setItem('isDelivery', `${isDelivery}`);
    localStorage.setItem('restaurantId', `${restaurantId}`);
    dispatch(setAddress(addressValue));
    dispatch(setDelivery(isDelivery));
    dispatch(setRestaurantValueId(restaurantId));
    dispatch(fetchRestaurant(`${restaurantId}`));
    nav('/');
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src='https://iq-pizza.eatery.club/storage/iq-pizza/setting/image/46/90558ab906921e3155908f3bb45844a2.png'
             alt='iq-banner' />
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h1>Замовляй у IQ Pizza</h1>
          <div className={styles.selectTypeDelivery}>
            <button className={`${isDelivery && styles.active}`} onClick={onClickType(true)}>Доставка</button>
            <button className={`${isDelivery || styles.active}`} onClick={onClickType(false)}>Самовивіз</button>
          </div>
          <h3>{isDelivery ? 'Куди доставити?' : 'Самовивіз з:'}</h3>
          <Select setCityProps={setCity} setRestaurantId={setRestaurantId} />
          {isDelivery ?
            <div className={styles.addressInput}>
              <CheckPoint />
              <input placeholder={'Введіть адресу'} value={addressValue}
                     onChange={(e) => setAddressValue(e.target.value)} />
            </div> :
            <RestaurantSelect city={city} setAddress={setAddressValue} setRestaurantId={setRestaurantId} />}
          <PrimaryButton isDefault={addressValue.length >= 5} onClick={onSubmit}>Підтвердити адресу</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Address;



