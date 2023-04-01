import React, { FC } from 'react';
import styles from './CartPopup.module.scss';
import PopupLayout from '../../layouts/popupLayout';
import { useAnimationPopup } from '../../../hooks/useAnimationPopup';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setCartPopup, setProductPopup } from '../../../store/counter/popupSlice';
import { useCart } from '../../../hooks/useCart';
import Close from '../../ui/icons/Close';
import PrimaryButton from '../../ui/buttons/primaryButton';
import { useNavigate } from 'react-router-dom';


const CartPopup: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((root) => root.cartSlice.cart);
  const isActive = useAppSelector((root) => root.popupSlice.cartPopup);
  const closeDispatch = () => {
    dispatch(setCartPopup(false));
  };
  const { active, onClosePopup } = useAnimationPopup({ isActive, closeDispatch });
  const { onChangeCount, onRemoveFromCart } = useCart(onClosePopup);
  const onClickProduct = (productId: number) => () => {
    onClosePopup();
    dispatch(setProductPopup({ productId, active: true }));
  };
  const onClickOrder = () => {
    navigate('/order');
    onClosePopup();
  };
  const totalSum = cart.map((el) => el.selectedAttributes.map((obj) => obj.price).reduce((p, c) => p + c, el.price) * el.count).reduce((p, c) => p + c, 0);
  return (
    <PopupLayout active={active} onClosePopup={onClosePopup}>
      <div className={`${styles.cartContainer} ${active && styles.active}`}>
        <div className={styles.cartWrapper} onClick={(e) => e.stopPropagation()}>
          <div className={styles.head}>
            <span>Кошик</span>
            <span onClick={onClosePopup}><Close /></span>
          </div>
          <div className={styles.productsWrapper}>
            {cart.map((el, i) =>
              <div key={i} className={styles.productBlock}>
                <div className={styles.left} onClick={onClickProduct(el.id)}>
                  <img src={el.imageLink} alt={'product-img'} />
                </div>
                <div className={styles.right}>
                  <div className={styles.title}>
                    <p onClick={onClickProduct(el.id)}>{el.name}</p>
                    <span onClick={onRemoveFromCart(i)}>
                    <Close />
                    </span>
                  </div>
                  <ul>
                    <li>1х Бортик звичайний 30 см</li>
                    {el.selectedAttributes.map((el) =>
                      <li key={el.id}>1х {el.name}</li>,
                    )}
                  </ul>
                  <div className={styles.bottom}>
                    <p>{el.selectedAttributes.map((obj) => obj.price).reduce((p, c) => p + c, el.price)} ₴</p>
                    <div className={styles.controls}>
                      <button className={`${el.count === 1 && styles.active}`} onClick={onChangeCount(i, true)}>-
                      </button>
                      <p>{el.count}</p>
                      <button onClick={onChangeCount(i, false)}>+</button>
                    </div>
                  </div>
                </div>
              </div>,
            )}
          </div>
          <div className={styles.bottomCart}>
            <div className={styles.totalSum}>
              <p>Сума замовлення: <span>{totalSum} ₴</span></p>
              <h4>Всього до сплати: <span><span>{totalSum} ₴</span></span></h4>
            </div>
            <div className={styles.buttonWrapper}>
              <PrimaryButton isDefault={true} onClick={onClickOrder}>
                Замовити
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </PopupLayout>
  );
};

export default CartPopup;