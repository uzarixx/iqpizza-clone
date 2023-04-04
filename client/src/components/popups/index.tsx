import { FC } from 'react';
import ReviewPopup from './reviewPopup';
import { useAppSelector } from '../../store/store';
import ReviewEndPopup from './reviewEndPopup';
import ProductPopup from './productPopup';
import CartPopup from './cartPopup';
import LoginPopup from './loginPopup';
import RegistrationPopup from './registrationPopup';
import OrderPopup from './orderPopup';


const Popups: FC = () => {
  const isActiveReview = useAppSelector((root) => root.popupSlice.reviewPopup);
  const isActiveReviewEnd = useAppSelector((root) => root.popupSlice.reviewEndPopup);
  const isActiveProduct = useAppSelector((root) => root.popupSlice.productPopup);
  const isActiveCart = useAppSelector((root) => root.popupSlice.cartPopup);
  const isActiveLogin = useAppSelector((root) => root.popupSlice.loginPopup);
  const isActiveRegistration = useAppSelector((root) => root.popupSlice.registrationPopup);
  const isActiveOrder = useAppSelector((root) => root.popupSlice.orderPopup);
  return (
    <>
      {isActiveReview && <ReviewPopup />}
      {isActiveReviewEnd && <ReviewEndPopup />}
      {isActiveProduct.active && <ProductPopup />}
      {isActiveOrder.active && <OrderPopup />}
      {isActiveCart && <CartPopup />}
      {isActiveLogin && <LoginPopup />}
      {isActiveRegistration && <RegistrationPopup />}
    </>
  );
};
export default Popups;