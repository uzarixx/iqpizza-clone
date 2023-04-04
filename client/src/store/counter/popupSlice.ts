import { createSlice } from '@reduxjs/toolkit';


export interface CounterState {
  reviewPopup: boolean;
  reviewEndPopup: boolean;
  productPopup: { productId: number, active: boolean };
  orderPopup: { orderId: number, active: boolean };
  cartPopup: boolean;
  loginPopup: boolean;
  registrationPopup: boolean;
}

const initialState: CounterState = {
  reviewPopup: false,
  reviewEndPopup: false,
  cartPopup: false,
  productPopup: { productId: 0, active: false },
  orderPopup: { orderId: 0, active: false },
  loginPopup: false,
  registrationPopup: false,
};

const popupSlice = createSlice({
  name: 'popupSlice',
  initialState,
  reducers: {
    setReviewPopup: (state, action) => {
      state.reviewPopup = action.payload;
    },
    setReviewEndPopup: (state, action) => {
      state.reviewEndPopup = action.payload;
    },
    setProductPopup: (state, action) => {
      state.productPopup = action.payload;
    },
    setCartPopup: (state, action) => {
      state.cartPopup = action.payload;
    },
    setLoginPopup: (state, action) => {
      state.loginPopup = action.payload;
    },
    setRegistrationPopup: (state, action) => {
      state.registrationPopup = action.payload;
    },
    setOrderPopup: (state, action) => {
      state.orderPopup = action.payload;
    },
  },
});


export default popupSlice.reducer;

export const {
  setReviewPopup,
  setReviewEndPopup,
  setProductPopup,
  setCartPopup,
  setLoginPopup,
  setRegistrationPopup,
  setOrderPopup,
} = popupSlice.actions;

