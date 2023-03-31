import { FC } from 'react';
import styles from './ProductPopup.module.scss';
import PopupLayout from '../../../layouts/popupLayout';
import { useAnimationPopup } from '../../../../hooks/useAnimationPopup';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { setProductPopup } from '../../../../store/counter/popupSlice';
import Checkbox from '../../inputs/checkbox';
import PrimaryButton from '../../buttons/primaryButton';
import { useCart } from '../../../../hooks/useCart';
import { useFetchProduct } from '../../../../hooks/useFetchProduct';


const ProductPopup: FC = () => {
    const isActive = useAppSelector((root) => root.popupSlice.productPopup);
    const { product, attributes } = useFetchProduct(isActive.active, isActive.productId);
    const dispatch = useAppDispatch();
    const closeDispatch = () => {
      dispatch(setProductPopup({ productId: 0, active: false }));
    };
    const { active, onClosePopup } = useAnimationPopup({ isActive: isActive.active, closeDispatch });
    const { onAddToCard, onClickAttributes, selectedAttributes, setCount, count } = useCart(onClosePopup);
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
                <div className={styles.modify}>
                  <p>Модифікатори</p>
                  <ul>
                    {attributes.map((el) =>
                      <li onClick={onClickAttributes(el)} key={el.id}>
                        <div className={styles.left}>
                          <Checkbox isActive={selectedAttributes.includes(el)} setChecked={() => {
                          }} />
                          <p>{el.name}</p>
                        </div>
                        <span>+ {el.price} ₴</span></li>,
                    )}
                  </ul>
                </div>
              </div>
              <div className={styles.selectors}>
                <div className={styles.left}>
                  <button onClick={() => setCount((p) => p >= 2 ? p - 1 : p)}>-</button>
                  <p>{count}</p>
                  <button onClick={() => setCount((p) => p + 1)}>+</button>
                </div>
                <div className={styles.right}>
                  <PrimaryButton
                    isDefault
                    onClick={onAddToCard(el)}>Додати:
                    <p>
                      {selectedAttributes.map((obj) => obj?.price)?.reduce((p, c) => p + c, el.price) * count} ₴
                    </p>
                  </PrimaryButton>
                </div>
              </div>
            </div>,
          )}
        </div>
      </PopupLayout>
    );
  }
;
export default ProductPopup;