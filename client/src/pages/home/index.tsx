import { FC, useEffect } from 'react';
import { useAddressActivate } from '../../hooks/useAddressActivate';
import styles from './Home.module.scss';
import RestaurantBanner from '../../components/ui/restaurantBanner';
import MenuBar from '../../components/ui/asides/menuBar';
import MenuLayout from '../../components/layouts/menuLayout';
import { useAppDispatch } from '../../store/store';
import { fetchProducts } from '../../store/counter/productsSlice';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  useAddressActivate();
  return (
    <div className={styles.homeContainer}>
      <RestaurantBanner />
      <div className={styles.menu}>
        <MenuBar />
        <MenuLayout />
      </div>
    </div>
  );
};

export default Home;