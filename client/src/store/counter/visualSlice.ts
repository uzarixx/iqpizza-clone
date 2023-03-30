import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RestaurantFetchService from '../../services/http/restaurantFetchService';

export const fetchRestaurant = createAsyncThunk(
  'visualSlice/restaurant',
  async function(id: string) {
    try {
      const { data } = await RestaurantFetchService.getRestaurantById(id);
      return data;
    } catch (e) {
      localStorage.removeItem('restaurantId');
    }
  },
);

export interface CounterState {
  address: string;
  delivery: boolean;
  restaurantId: number;
  restaurant: { id: number, city: string, streetName: string, streetNumber: string, openAt: number, closedAt: number };
}

const initialState: CounterState = {
  address: '',
  delivery: false,
  restaurantId: 0,
  restaurant: { id: 0, city: '', streetName: '', streetNumber: '', openAt: 0, closedAt: 0 },
};

const visualSlice = createSlice({
  name: 'visualSlice',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setDelivery: (state, action) => {
      state.delivery = action.payload;
    },
    setRestaurantValueId: (state, action) => {
      state.restaurantId = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<CounterState>) => {
    builder.addCase(fetchRestaurant.fulfilled, (state, action) => {
      state.restaurant = action.payload;
    });
  },
});


export default visualSlice.reducer;

export const { setAddress, setDelivery, setRestaurantValueId } = visualSlice.actions;

