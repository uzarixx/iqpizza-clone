import { FC } from 'react';
import ReviewPopup from './reviewPopup';
import { useAppSelector } from '../../../store/store';
import ReviewEndPopup from './reviewEndPopup';
import ProductPopup from './productPopup';


const Popups: FC = () => {
  const isActiveReview = useAppSelector((root) => root.popupSlice.reviewPopup);
  const isActiveReviewEnd = useAppSelector((root) => root.popupSlice.reviewEndPopup);
  const isActiveProduct = useAppSelector((root) => root.popupSlice.productPopup);
  return (
    <>
      {isActiveReview && <ReviewPopup />}
      {isActiveReviewEnd && <ReviewEndPopup />}
      {isActiveProduct.active && <ProductPopup />}
    </>
  );
};
export default Popups;