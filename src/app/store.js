import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from '../actions-reducers/goals';
import loginReducer from '../actions-reducers/login';
import logoutReducer from '../actions-reducers/logout';
import userReducer from '../actions-reducers/users';
import habitsReducer from '../actions-reducers/habits';

const reducer = {
  user: userReducer,
  login: loginReducer,
  goals: goalsReducer,
  logout: logoutReducer,
  habits: habitsReducer,
};

export const setupStore = () => {
  return configureStore({
    reducer,
  });
};

export const store = configureStore({
  reducer,
});
