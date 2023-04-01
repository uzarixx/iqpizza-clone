import React, { FC, useEffect } from 'react';
import styles from './Home.module.scss'
import { useAppDispatch } from '../../../store/store';
import { fetchProducts } from '../../../store/counter/productsSlice';
import { useAddressActivate } from '../../../hooks/useAddressActivate';
import MenuBar from '../../ui/asides/menuBar';
import MenuLayout from '../../layouts/menuLayout';
import CartButton from '../../ui/buttons/cartButton';
import RestaurantBanner from '../../ui/restaurantBanner';


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
        <CartButton />
      </div>
    </div>
  );
};

export default Home;