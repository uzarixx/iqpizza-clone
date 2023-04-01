import React, { useEffect } from 'react';
import Router from './router';
import { useAppDispatch } from './store/store';
import { fetchRestaurant } from './store/counter/visualSlice';
import { setCart } from './store/counter/cartSlice';

function App() {
  const dispatch = useAppDispatch();
  const restaurantId = localStorage.getItem('restaurantId');
  const cart = localStorage.getItem('cart');
  useEffect(() => {
    restaurantId && dispatch(fetchRestaurant(restaurantId));
  }, [restaurantId]);
  useEffect(() => {
    const savedCart = JSON.parse(cart || '[]');
    dispatch(setCart(savedCart));
  }, []);
  return (
      <Router />
  );
}

export default App;
