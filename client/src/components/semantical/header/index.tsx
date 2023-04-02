import { FC, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import GeoSvg from '../../ui/icons/GeoSvg';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setAddress, setDelivery } from '../../../store/counter/visualSlice';
import { Link, useLocation } from 'react-router-dom';
import { setLoginPopup } from '../../../store/counter/popupSlice';
import HeartIco from '../../ui/icons/HeartIco';


const Header: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((root) => root.userSlice.user);
  const address = useAppSelector((store) => store.visualSlice.address);
  const isDelivery = useAppSelector((store) => store.visualSlice.delivery);
  const addressStorage = localStorage.getItem('address');
  const restaurantId = localStorage.getItem('restaurantId');
  const isDeliveryStorage = localStorage.getItem('isDelivery');
  useEffect(() => {
    dispatch(setAddress(`${addressStorage}`));
    dispatch(setDelivery(isDeliveryStorage === 'true'));
  }, [addressStorage, restaurantId, isDeliveryStorage]);
  const onClickLogin = () => {
    dispatch(setLoginPopup(true));
  };
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerWrapper}>
        <Link to={'/'}>
          <div className={styles.logo}><img
            src={'https://iq-pizza.eatery.club/storage/iq-pizza/setting/image/15/d425b2e046729fd833f75cfd5fa18659.png'}
            alt={'logo'} /></div>
        </Link>
        {addressStorage && <>
          {<div className={styles.city}><GeoSvg />
            <p>{isDelivery ? 'Доставка, вулиця' : 'Самовивiз, IQ pizza на'} {address}</p></div>}
          {user
            ?
            <div className={styles.userAuth}>
              <Link to={'/profile/favorites'}>
                <HeartIco />
              </Link>
              <Link to={'/profile/edit'} className={styles.iconUser}>
                <img src={'https://iq-pizza.eatery.club/storage/iq-pizza/setting/image/10443/man.png'}
                     alt={'user-ico'} />
              </Link>
            </div>
            :
            <div className={styles.user}>
              <button className={styles.login} onClick={onClickLogin}>Увійти</button>
            </div>
          }
        </>}
      </div>
    </header>
  );
};

export default Header;