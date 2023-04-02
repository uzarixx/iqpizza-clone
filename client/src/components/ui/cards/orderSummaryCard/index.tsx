import React, { FC } from 'react';
import styles from './OrderSummaryCard.module.scss';
import { IProduct } from '../../../../constants/types';
import PrimaryButton from '../../buttons/primaryButton';
import { Link } from 'react-router-dom';

interface Props {
  cart: IProduct[];
}

const OrderSummaryCard: FC<Props> = ({ cart }) => {
  const totalSum = cart.map((el) => el.selectedAttributes.map((obj) => obj.price).reduce((p, c) => p + c, el.price) * el.count).reduce((p, c) => p + c, 0);
  return (
    <div className={styles.orderSummaryCard}>
      <div className={styles.title}>Ваше замовлення</div>
      <div className={styles.productsWrapper}>
        {cart.map((el, i) =>
          <div className={styles.product} key={i}>
            <div className={styles.left}>
              <p>{el.name}</p>
              <span>{el.weight} г</span>
              {el.selectedAttributes.map((el, i) =>
                <span key={i}>1x {el.name}</span>
              )}
            </div>
            <div className={styles.right}>
              <p>x {el.count}</p>
              <span>{el.selectedAttributes.map((obj) => obj.price).reduce((p, c) => p + c, el.price)} ₴</span>
            </div>
          </div>,
        )}
      </div>
      <div className={styles.summaryValue}>
        <h2>Сума замовлення: <span>{totalSum} ₴</span></h2>
        <h3>Всього до сплати: <span>{totalSum} ₴</span></h3>
      </div>
      <div className={styles.buttons}>
        <PrimaryButton type={'submit'} isDefault={true} onClick={() => {}}>Оплатити {totalSum} ₴</PrimaryButton>
        <Link to={'/'}>Повернутись в меню</Link>
      </div>
    </div>
  );
};

export default OrderSummaryCard;