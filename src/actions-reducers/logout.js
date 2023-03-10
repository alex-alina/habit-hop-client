import { createAction, createReducer } from '@reduxjs/toolkit';
import { localStorageJwtKey } from '../utils/constants';

export const logout = createAction('user/logout');
const initialState = {};
const logoutReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(logout, (state) => {
      const status = 'success';
      localStorage.removeItem(localStorageJwtKey);
      return { ...state, status };
    })
    .addDefaultCase((state) => {
      const status = 'idle';
      return { ...state, status };
    });
});

export default logoutReducer;
