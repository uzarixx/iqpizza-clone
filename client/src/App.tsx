import React, { useEffect } from 'react';
import Router from './router';
import { useAppDispatch } from './store/store';
import { fetchRestaurant } from './store/counter/visualSlice';
import axios from 'axios';

function App() {
  const dispatch = useAppDispatch();
  const restaurantId = localStorage.getItem('restaurantId');
  useEffect(() => {
    restaurantId && dispatch(fetchRestaurant(restaurantId));
  }, [restaurantId]);

  return (
    <Router />
  );
}

export default App;
