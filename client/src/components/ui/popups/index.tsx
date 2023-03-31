import { FC } from 'react';
import ReviewPopup from './reviewPopup';
import { useAppSelector } from '../../../store/store';
import ReviewEndPopup from './reviewEndPopup';
import ProductPopup from './productPopup';
import CartPopup from './cartPopup';


const Popups: FC = () => {
  const isActiveReview = useAppSelector((root) => root.popupSlice.reviewPopup);
  const isActiveReviewEnd = useAppSelector((root) => root.popupSlice.reviewEndPopup);
  const isActiveProduct = useAppSelector((root) => root.popupSlice.productPopup);
  const isActiveCart = useAppSelector((root) => root.popupSlice.cartPopup);
  return (
    <>
      {isActiveReview && <ReviewPopup />}
      {isActiveReviewEnd && <ReviewEndPopup />}
      {isActiveProduct.active && <ProductPopup />}
      {isActiveCart && <CartPopup />}
    </>
  );
};
export default Popups;