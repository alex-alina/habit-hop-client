import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from '../actions-reducers/goals';
import loginReducer from '../actions-reducers/login';
import logoutReducer from '../actions-reducers/logout';
import userReducer from '../actions-reducers/users';

const reducer = {
  user: userReducer,
  login: loginReducer,
  goals: goalsReducer,
  logout: logoutReducer,
};

export const store = configureStore({
  reducer,
});
