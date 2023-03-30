import { createSlice } from '@reduxjs/toolkit';


export interface CounterState {
  cart: any
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

