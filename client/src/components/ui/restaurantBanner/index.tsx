import { FC } from 'react';
import styles from './RestaurantBanner.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import Info from '../icons/Info';
import Review from '../icons/Review';
import { setReviewPopup } from '../../../store/counter/popupSlice';

const RestaurantBanner: FC = () => {
  const dispatch = useAppDispatch();
  const restaurant = useAppSelector((root) => root.visualSlice.restaurant);
  const nowHour = new Date().getHours();
  const onClickReviewPopup = () => {
    dispatch(setReviewPopup(true));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftBanner}><img
        src={'https://iq-pizza.eatery.club/storage/iq-pizza/restaurant/image/6076/6e2ee4c48d5cf7b4a9045850d1952ee6.jpg'}
        alt={'iq-pizza'} /></div>
      <div className={styles.right}>
        <div className={styles.title}>
          <h2>IQ Pizza на {restaurant.streetName} {restaurant.streetNumber}</h2>
          <img
            src='https://iq-pizza.eatery.club/storage/iq-pizza/restaurant/logo/2795/5913f6bb57237ed1b0b08e142321144e.png'
            alt='iq-piza-logo' />
        </div>
        <div className={styles.numberPhones}>
          <a href='tel:+380681151010'>+380 (68) 115 10 10</a>
          <a href='tel:+380991151010'>+380 (99) 115 10 10</a>
        </div>
        <div className={styles.infoAboutRestaurant}>
          <div className={styles.left}>
            <p>Інформація про ресторан</p>
            <span><span
              className={`${nowHour > restaurant.openAt && nowHour < restaurant.closedAt ? styles.isOpen : styles.isClosed}`}></span>  Відкрито з {restaurant.openAt}:00 до {restaurant.closedAt}:00</span>
          </div>
          <div className={styles.right}><Info /></div>
        </div>
        <div className={styles.reviewBlock} onClick={onClickReviewPopup}>
          <p>Залиште відгук про роботу закладу або вашу недавню доставку.</p>
          <span><Review /></span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBanner;