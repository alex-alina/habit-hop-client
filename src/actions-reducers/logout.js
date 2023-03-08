import { createAction, createReducer } from '@reduxjs/toolkit';
import { localStorageJwtKey } from '../utils/constants';

export const logout = createAction('user/logout');
const initialState = {};
const logoutReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(logout, (state) => {
      localStorage.removeItem(localStorageJwtKey);
      return { ...state };
    })
    .addDefaultCase((state) => {
      state;
    });
});

export default logoutReducer;
