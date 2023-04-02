import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserFetchService from '../../services/http/userFetchService';

export const fetchUser = createAsyncThunk(
  'userSlice/user',
  async function() {
    try {
      const { data } = await UserFetchService.getUser();
      localStorage.setItem('token', data.resultToken);
      return data;
    } catch (e) {
      console.log(e);
      localStorage.removeItem('token');
    }
  },
);


interface IUser {

  city: string,
  createdAt: string,
  dateOfBirth: string,
  email: string,
  id: number,
  name: string,
  phoneNumber: string

}

export interface CounterState {
  user: { resultToken: string, user: IUser } | null;
}

const initialState: CounterState = {
  user: null,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<CounterState>) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});


export default userSlice.reducer;

export const {setUser} = userSlice.actions;

