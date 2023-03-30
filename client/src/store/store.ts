import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import visualSlice from './counter/visualSlice';
import popupSlice from './counter/popupSlice';
import productsSlice from './counter/productsSlice';
import cartSlice from './counter/cartSlice';

export const store = configureStore({
  reducer: { visualSlice, popupSlice, productsSlice, cartSlice },
});


export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();