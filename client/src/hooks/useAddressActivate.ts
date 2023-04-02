import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export const useAddressActivate = () => {
  const nav = useNavigate();
  const addressStorage = localStorage.getItem('address');
  const isDelivery = localStorage.getItem('isDelivery');
  const restaurantId = localStorage.getItem('restaurantId');
  const city = localStorage.getItem('city');
  useEffect(() => {
    if (!addressStorage || !isDelivery || !restaurantId || !city) {
      nav('/address');
    }
  }, [addressStorage, isDelivery, restaurantId, city]);
  return;
};