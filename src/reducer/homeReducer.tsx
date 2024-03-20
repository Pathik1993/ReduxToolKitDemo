import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {homeScreenAPI} from '../services/homeApi';

export interface homeState {
  searchArr: any;
  image_path: string;
  isLoading: boolean;
  page: number;
}

const initialState: homeState = {
  searchArr: [],
  image_path: '',
  isLoading: false,
  page: 1,
};

export const counterSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSearchArr: (state, action) => {
      state.searchArr = [...state.searchArr, ...action.payload];
    },
    setImage_path: (state, action) => {
      state.image_path = action.payload;
    },
    setIsLoading: (state, action) => {
      // state.searchArr = [...state.value, randomRgb()];
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setSearchArr, setImage_path, setIsLoading} = counterSlice.actions;

export default counterSlice.reducer;
