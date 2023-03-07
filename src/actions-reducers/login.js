import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import * as superagent from 'superagent';
import { baseUrl, localStorageJwtKey } from '../utils/constants';
import { extractUserId } from '../utils/jwt';

export const loginUser = createAsyncThunk('user/login', async (credentials) => {
  try {
    const response = await superagent
      .post(`${baseUrl}/logins`)
      .send(credentials);

    const userJwt = response.body.data.jwt;
    const userId = extractUserId(userJwt);

    return { userJwt, userId };
  } catch (err) {
    if (err.response) {
      const errorWrapper = JSON.parse(err.response.text);
      throw `${errorWrapper.error.message}`;
    }
    throw new Error(err);
  }
});

let initialState = {};
// try {
//   const userJwt = localStorage.getItem(localStorageJwtKey);
//   if (userJwt) {
//     initialState = { userJwt, ...initialState };
//   }
// } catch (e) {
//   console.log(`Error retrieving data from local storage`, e);
// }

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginUser.pending, (state) => {
      const status = 'loading';

      return { status, ...state };
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      const status = 'success';
      const { userJwt } = action.payload.userJwt;

      localStorage.setItem(localStorageJwtKey, userJwt);

      return { ...state, ...action.payload, status, error: {} };
    })
    .addCase(loginUser.rejected, (state, action) => {
      const error = action.error;
      const status = 'failed';

      return { ...state, error, status };
    })
    .addDefaultCase((state) => {
      state;
    });
});

export default loginReducer;
