import {
  // createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import * as superagent from 'superagent';

// const userSignup = createAction('user/signup');

export const createUser = createAsyncThunk('user/signup', async (userData) => {
  try {
    const response = await superagent
      .post('http://localhost:3002/users')
      .send(userData);
    console.log('response', response.body.data.rest);
    return response.body.data.rest;
  } catch (err) {
    throw new Error(err.message, err);
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
      return { ...state, ...action.payload, status };
    })
    .addCase(createUser.rejected, (state, action) => {
      console.log('action.rejected', action.error);
      const status = 'failed';
      return { ...state, status };
    });
  // .addDefaultCase((state, action) => {state});
});

export default userReducer;
