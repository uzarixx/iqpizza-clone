import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../constants/types';


export interface CounterState {
  cart: IProduct[];
}

const initialState: CounterState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});


export default cartSlice.reducer;

export const { setCart } = cartSlice.actions;

