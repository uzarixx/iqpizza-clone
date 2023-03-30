import { FC, useEffect, useState } from 'react';
import styles from './ProductPopup.module.scss';
import PopupLayout from '../../../layouts/popupLayout';
import { useAnimationPopup } from '../../../../hooks/useAnimationPopup';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { setProductPopup } from '../../../../store/counter/popupSlice';
import ProductsFetchService from '../../../../services/http/productsFetchService';
import { setCart } from '../../../../store/counter/cartSlice';

interface IProduct {
  description: string,
  id: number,
  imageLink: string,
  isPizza: boolean,
  name: string,
  price: number,
  weight: number
  count: number
}

const ProductPopup: FC = () => {
    const [product, setProduct] = useState<IProduct[]>([]);
    const dispatch = useAppDispatch();
    const cart = useAppSelector((root) => root.cartSlice.cart);
    const isActive = useAppSelector((root) => root.popupSlice.productPopup);
    const closeDispatch = () => {
      dispatch(setProductPopup({ productId: 0, active: false }));
    };
    const { active, onClosePopup } = useAnimationPopup({ isActive: isActive.active, closeDispatch });
    useEffect(() => {
      const fetchProduct = async () => {
        const { data } = await ProductsFetchService.getProductById(isActive.productId);
        return setProduct(data);
      };
      if (isActive) {
        fetchProduct();
      }
    }, [isActive]);
    const onAddToCard = (el: IProduct) => () => {
      const findProduct = cart.find((obj: IProduct) => obj.id === el.id);
      if (findProduct)
        dispatch(setCart(cart.map((obj: IProduct) => obj.id === el.id ? ({ ...obj, count: obj.count + 1 }) : ({
          ...obj,
          count: 1,
        }))));
      else
        dispatch(setCart(cart.concat({ ...el, count: 1 })));
    };

    console.log(cart);


    return (
      <PopupLayout active={active} onClosePopup={onClosePopup}>
        <div className={`${styles.productPopupWrapper} ${active && styles.active}`}
             onClick={(e) => e.stopPropagation()}>
          {product.map((el) =>
            <div className={styles.main} key={el.id}>
              <div className={styles.imageBlock}>
                <img src={el.imageLink} alt='product-image' />
                <div className={styles.scrollBlockShadow}></div>
              </div>
              <div className={styles.scrollBlock}>
                <div className={styles.title}>
                  <h3>{el.name}</h3>
                </div>
                <span className={styles.weight}>{el.weight} г</span>
                <span className={styles.price}>{el.price} ₴</span>
                <p className={styles.description}>{el.description}</p>
              </div>
              <div className={styles.selectors}>
                <button onClick={onAddToCard(el)}>Додати: {el.price} ₴</button>
              </div>
            </div>,
          )}
        </div>
      </PopupLayout>
    );
  }
;
export default ProductPopup;