import { FC, useEffect, useState } from 'react';
import styles from './RestaurantSelect.module.scss';
import RestaurantFetchService from '../../../../services/http/restaurantFetchService';

interface props {
  city: string;
  setAddress: (v: string) => void;
  setRestaurantId: (v: number) => void;
}

const RestaurantSelect: FC<props> = ({ city, setAddress, setRestaurantId }) => {
  const [restaurant, setRestaurant] = useState<number | null>(null);
  const [restaurantsList, setRestaurantsList] = useState<{id: number, streetName: string, streetNumber: string, openAt: number, closedAt: number }[]>([]);
  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data } = await RestaurantFetchService.getRestaurant(city);
      return setRestaurantsList(data);
    };
    fetchRestaurants();
  }, [city]);
  const onClickRestaurant = (index: number, address: string, id: number) => () => {
    setRestaurant(index);
    setAddress(address);
    setRestaurantId(id)
  };
  const nowHour = new Date().getHours();
  return (
    <div className={styles.restaurantContainer}>
      {restaurantsList.map((el, i) =>
        <div className={`${styles.restaurantWrapper} ${i === restaurant && styles.selected}`} key={i}
             onClick={onClickRestaurant(i, `${el.streetName}, ${el.streetNumber}`, el.id)}>
          <h2>IQ pizza на {el.streetName}, {el.streetNumber}</h2>
          <span>вул. {el.streetName}, {el.streetNumber}</span>
          <p className={`${nowHour >= el.openAt && nowHour <= el.closedAt ? styles.isOpen : styles.isClosed}`}>Відкрито
            з {el.openAt}:00 до {el.closedAt}:00</p>
        </div>,
      )}
    </div>
  );
};

export default RestaurantSelect;