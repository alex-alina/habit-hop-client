import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import * as superagent from 'superagent';
import { baseUrl } from '../utils/constants';
let existingUserErrMsg;

export const createUser = createAsyncThunk('user/signup', async (user) => {
  try {
    const response = await superagent.post(`${baseUrl}/users`).send(user);

    existingUserErrMsg = '';
    const { userData, jwt } = response.body.data;

    return { userData, userJwt: jwt };
  } catch (err) {
    if (err.status === 409) {
      existingUserErrMsg = 'A user with this email already exists';
    }
    throw new Error(err);
  }
});

const initialState = {};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createUser.pending, (state) => {
      const status = 'loading';
      return { status, ...state };
    })
    .addCase(createUser.fulfilled, (state, action) => {
      const status = 'success';
      return { ...state, ...action.payload, status, existingUserErrMsg };
    })
    .addCase(createUser.rejected, (state, action) => {
      const error = action.error;
      const status = 'failed';
      return { ...state, error, status, existingUserErrMsg };
    })
    .addDefaultCase((state) => {
      state;
    });
});

export default userReducer;
