import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import * as superagent from 'superagent';
import { baseUrl, localStorageJwtKey } from '../utils/constants';
import { logout } from './logout';

export const createUser = createAsyncThunk('user/signup', async (user) => {
  try {
    const response = await superagent.post(`${baseUrl}/users`).send(user);
    const { userData, jwt } = response.body.data;
    localStorage.setItem(localStorageJwtKey, jwt);

    return { ...userData };
  } catch (err) {
    if (err.response) {
      const errorWrapper = JSON.parse(err.response.text);
      throw `${errorWrapper.error.message}`;
    }
    if (err.message.match(/Request has been terminated/i)) {
      throw new Error(
        'There are issues with the server. Please try again later'
      );
    }
    throw new Error(err);
  }
});

export const getCurrentUser = createAsyncThunk(
  'user/currentUser',
  async ({ userId, userToken }) => {
    try {
      const response = await superagent
        .get(`${baseUrl}/users/${userId}`)
        .set('Authorization', `Bearer ${userToken}`);

      const { user } = response.body.data;

      return { ...user };
    } catch (err) {
      if (err.response) {
        const errorWrapper = JSON.parse(err.response.text);
        throw `${errorWrapper.error.message}`;
      }
      if (err.message.match(/Request has been terminated/i)) {
        throw new Error(
          'There are issues with the server. Please try again later'
        );
      }
      throw new Error(err);
    }
  }
);

const initialState = {};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createUser.pending, (state) => {
      const status = 'loading';
      return { status, ...state };
    })
    .addCase(createUser.fulfilled, (state, action) => {
      const status = 'success';
      return { ...state, ...action.payload, status, error: {} };
    })
    .addCase(createUser.rejected, (state, action) => {
      const error = action.error;
      const status = 'failed';
      return { ...state, error, status };
    })
    .addCase(getCurrentUser.pending, (state) => {
      const status = 'loading';
      return { status, ...state };
    })
    .addCase(getCurrentUser.fulfilled, (state, action) => {
      const status = 'success';
      return { ...state, ...action.payload, status, error: {} };
    })
    .addCase(getCurrentUser.rejected, (state, action) => {
      const error = action.error;
      const status = 'failed';
      return { ...state, error, status };
    })
    .addCase(logout, () => {
      return initialState;
    })
    .addDefaultCase((state) => {
      state;
    });
});

export default userReducer;
