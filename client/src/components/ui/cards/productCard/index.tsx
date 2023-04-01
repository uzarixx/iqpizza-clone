import { FC } from 'react';
import styles from './ProductCard.module.scss';
import Plus from '../../icons/Plus';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { setProductPopup } from '../../../../store/counter/popupSlice';

interface IProductCard {
  id: number;
  imageLink: string;
  weight: number;
  name: string;
  price: number;
  description: string;
  isSelected?: boolean
}

const ProductCard: FC<IProductCard> = ({ id, imageLink, weight, name, price, description, isSelected }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={`${styles.productCard} ${isSelected && styles.productCardActive}`} onClick={() => dispatch(setProductPopup({ productId: id, active: true }))}>
      <div className={styles.left}>
        <img src={imageLink} alt='product-img' width={154} height={154} />
        <span>{weight} г</span>
      </div>
      <div className={styles.right}>
        <h4>{name}</h4>
        <p>{description}</p>
        <div className={styles.bottomWrapper}>
          <span>{price} ₴</span>
          <div className={styles.onAddToCard}><Plus /></div>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;