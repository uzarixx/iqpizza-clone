import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProductsFetchService from '../../services/http/productsFetchService';

export const fetchProducts = createAsyncThunk(
  'productsSlice/product',
  async function() {
    try {
      const { data } = await ProductsFetchService.getAllProducts();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const fetchFavorites = createAsyncThunk(
  'productSlice/favorites',
  async function() {
    try {
      const { data } = await ProductsFetchService.getFavorites();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

export interface CounterState {
  products: [{ description: string, id: number, imageLink: string, isPizza: boolean, name: string, price: number, weight: number }];
  favorites: Array<number>;
}

const initialState: CounterState = {
  products: [{ description: '', id: 0, imageLink: '', isPizza: true, name: '', price: 0, weight: 0 }],
  favorites: [],
};

const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<CounterState>) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});


export default productsSlice.reducer;

export const { setFavorites } = productsSlice.actions;

