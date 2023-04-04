import React, { FC, MouseEvent } from 'react';
import styles from './ProductCard.module.scss';
import Plus from '../../icons/Plus';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { setLoginPopup, setProductPopup } from '../../../../store/counter/popupSlice';
import HeartIco from '../../icons/HeartIco';
import { setFavorites } from '../../../../store/counter/productsSlice';
import HeartOutline from '../../icons/HeartOutline';
import ProductsFetchService from '../../../../services/http/productsFetchService';

interface IProductCard {
  id: number;
  imageLink: string;
  weight: number;
  name: string;
  price: number;
  description: string;
  isSelected?: boolean;
  stylesMore?: boolean;
  isFavorite?: boolean
}

const ProductCard: FC<IProductCard> = ({ id, imageLink, weight, name, price, description, isSelected, stylesMore, isFavorite }) => {
  const dispatch = useAppDispatch();
  const favorite = useAppSelector((root) => root.productsSlice.favorites);
  const user = useAppSelector((root) => root.userSlice.user);
  const onClickFavorite = async (e: MouseEvent<HTMLDivElement>, id: number) => {
    e.stopPropagation();
    if (!user) {
      dispatch(setLoginPopup(true));
    } else {
      favorite?.includes(id) ? await ProductsFetchService.deleteFavorite(id) : await ProductsFetchService.addToFavorite(id);
      dispatch(setFavorites(favorite?.includes(id) ? favorite?.filter((el) => el !== id) : favorite?.concat(id)));
    }
  };

  return (
    <div className={`${styles.productCard} ${isSelected && styles.productCardActive} ${stylesMore && styles.productStylesMore}`}
         onClick={() => dispatch(setProductPopup({ productId: id, active: true }))}>
      <div className={styles.left}>
        <img src={imageLink} alt='product-img' width={154} height={154} />
        <span>{weight} г</span>
      </div>
      <div className={styles.right}>
        <div className={styles.topWrapper}>
          <h4>{name}</h4>
          <div className={`${styles.favorite}`} onClick={(e) => onClickFavorite(e, id)}>{isFavorite && isFavorite || favorite?.includes(id) ?
            <HeartOutline /> : <HeartIco />}</div>
        </div>
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