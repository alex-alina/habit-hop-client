import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../actions-reducers/users';
import loginReducer from '../actions-reducers/login';
import goalsReducer from '../actions-reducers/goals';

const reducer = {
  counter: counterReducer,
  user: userReducer,
  login: loginReducer,
  goals: goalsReducer,
};

export const store = configureStore({
  reducer,
});
