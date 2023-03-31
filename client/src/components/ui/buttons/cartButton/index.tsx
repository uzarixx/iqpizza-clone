import { FC } from 'react';
import styles from './CartButton.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { setCartPopup } from '../../../../store/counter/popupSlice';


const CartButton: FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((root) => root.cartSlice.cart);
  const price = cart.map((el) => el.selectedAttributes.map((obj) => obj.price).reduce((p, c) => p + c, el.price) * el.count).reduce((p, c) => p + c, 0);
  const openCart = () => {
    dispatch(setCartPopup(true));
  };
  return (
    <div className={`${styles.buttonWrapper} ${cart.length && styles.active}`} onClick={openCart}>
      <span>Оформити замовлення на:</span>
      <span>{price} ₴</span>
    </div>
  );
};

export default CartButton;