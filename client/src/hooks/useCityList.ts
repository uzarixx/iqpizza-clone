import { useEffect, useState } from 'react';
import RestaurantFetchService from '../services/http/restaurantFetchService';

interface props {
  setCityProps: (v: string) => void;
  setRestaurantId: (v: number) => void;
}

export const useCityList = ({ setRestaurantId, setCityProps }: props) => {
  const [citiesArray, setCitiesArray] = useState<{ city: string, id: number, restaurant: { id: number }[] }[]>([]);
  const [city, setCity] = useState('');
  useEffect(() => {
    const fetchCities = async () => {
      const { data } = await RestaurantFetchService.getAllRestaurants();
      setCitiesArray(data);
      setCity(data[0].city);
      setRestaurantId(data[0].id);
      return setCityProps(data[0].city);
    };
    fetchCities();
  }, []);
  return {
    city, setCity, citiesArray,
  };
};