import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RestaurantFetchService from '../../services/http/restaurantFetchService';


export interface CounterState {
  reviewPopup: boolean;
  reviewEndPopup: boolean;
  productPopup: { productId: number, active: boolean };
}

const initialState: CounterState = {
  reviewPopup: false,
  reviewEndPopup: false,
  productPopup: { productId: 0, active: false },
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
  },
});


export default popupSlice.reducer;

export const { setReviewPopup, setReviewEndPopup, setProductPopup } = popupSlice.actions;

