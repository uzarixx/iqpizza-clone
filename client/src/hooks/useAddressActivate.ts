import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export const useAddressActivate = () => {
  const nav = useNavigate();
  const addressStorage = localStorage.getItem('address');
  const isDelivery = localStorage.getItem('isDelivery');
  const restaurantId = localStorage.getItem('restaurantId');
  useEffect(() => {
    if (!addressStorage || !isDelivery || !restaurantId) {
      nav('/address');
    }
  }, [addressStorage, isDelivery, restaurantId]);
  return;
};