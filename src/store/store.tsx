import {configureStore} from '@reduxjs/toolkit';
import homeReducer from '../reducer/homeReducer';

export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});

export default store;
