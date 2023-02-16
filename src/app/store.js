import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../actions-reducers/users';

const reducer = {
  counter: counterReducer,
  user: userReducer,
};

export const store = configureStore({
  reducer,
});
