import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import * as superagent from 'superagent';
import { baseUrl, localStorageJwtKey } from '../utils/constants';
import { logout } from './logout';
import { createUser } from './users';

export const loginUser = createAsyncThunk('user/login', async (credentials) => {
  try {
    const response = await superagent
      .post(`${baseUrl}/logins`)
      .send(credentials);

    const userJwt = response.body.data.jwt;
    localStorage.setItem(localStorageJwtKey, userJwt);

    return { userJwt };
  } catch (err) {
    if (err.response) {
      const errorWrapper = JSON.parse(err.response.text);
      throw `${errorWrapper.error.message}`;
    }
    throw new Error(err);
  }
});

let initialState = {};

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginUser.pending, (state) => {
      const status = 'loading';
      return { status, ...state };
    })
    .addCase(loginUser.fulfilled, (state) => {
      const status = 'success';
      return { ...state, status, error: {} };
    })
    .addCase(loginUser.rejected, (state, action) => {
      const error = action.error;
      const status = 'failed';

      return { ...state, error, status };
    })
    .addCase(logout, () => {
      return initialState;
    })
    .addCase(createUser.fulfilled, (state) => {
      const status = 'success';
      return { ...state, status, error: {} };
    })
    .addDefaultCase((state) => {
      state;
    });
});

export default loginReducer;
