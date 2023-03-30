import React, { FC, useState } from 'react';
import styles from './Select.module.scss';
import ArrowSelect from '../../icons/ArrowSelect';
import { useCityList } from '../../../../hooks/useCityList';

interface props {
  setCityProps: (v: string) => void;
  setRestaurantId: (v: number) => void;
}

const Select: FC<props> = ({ setCityProps, setRestaurantId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { city, setCity, citiesArray } = useCityList({ setRestaurantId, setCityProps });
  const onClickCity = (el: { city: string, id: number, restaurant: { id: number }[] }) => () => {
    setCity(el.city);
    setCityProps(el.city);
    setRestaurantId(el.restaurant[0].id);
    setIsOpen(false);
  };
  return (
    <div className={styles.selectWrapper}>
      <p onClick={() => setIsOpen(!isOpen)}>{city} <ArrowSelect /></p>
      {isOpen && <ul>
        {citiesArray?.map((el, i) =>
          <li className={`${city === el?.city && styles.active}`} key={i} onClick={onClickCity(el)}>{el?.city}</li>,
        )}
      </ul>}
    </div>
  );
};

export default Select;