import { FC } from 'react';
import styles from './RepeatOrderPopup.module.scss';
import PopupLayout from '../../layouts/popupLayout';
import { useAnimationPopup } from '../../../hooks/useAnimationPopup';
import { useAppDispatch } from '../../../store/store';
import { setCart } from '../../../store/counter/cartSlice';
import { useNavigate } from 'react-router-dom';
import { setCartPopup, setOrderPopup } from '../../../store/counter/popupSlice';
import { IOrder } from '../../../constants/types';
import PrimaryButton from '../../ui/buttons/primaryButton';

interface props {
  isActive: boolean;
  order: IOrder;
  closeDispatch: () => void;
}

const RepeatOrderPopup: FC<props> = ({ isActive, closeDispatch, order }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { active, onClosePopup } = useAnimationPopup({ isActive, closeDispatch });
  const onClickRepeat = () => {
    const orderResult = order.orderMenu.map((el) => ({
      ...el.pizza,
      count: el.count,
      selectedAttributes: el.productsAttributes,
    }));
    dispatch(setCart(orderResult));
    localStorage.setItem('cart', JSON.stringify(orderResult));
    onClosePopup();
    setTimeout(() => {
    dispatch(setOrderPopup({ orderId: 0, active: false }));
    }, 200)
    navigate('/');
    dispatch(setCartPopup(true));
  };

  const onClickClose = () => {
    onClosePopup();
  };

  return (
    <PopupLayout active={active} onClosePopup={onClosePopup}>
      <div onMouseDown={(e) => e.stopPropagation()}
           className={`${styles.repeatOrderPopup} ${active && styles.activeRepeatOrder}`}>
        <div className={styles.repeatOrderPopupTitle}><h3>Повторити замовлення</h3></div>
        <p className={styles.repeatOrderPopupText}>
          Ми очистимо кошик і замінимо на позиції з вашого останнього замовлення
        </p>
        <div className={styles.buttons}>
          <PrimaryButton isDefault={true} onClick={onClickClose}>Скасувати</PrimaryButton>
          <PrimaryButton isDefault={true} onClick={onClickRepeat}>Підтвердити</PrimaryButton>
        </div>
      </div>
    </PopupLayout>
  );
};

export default RepeatOrderPopup;