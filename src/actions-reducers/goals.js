import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import * as superagent from 'superagent';
import { baseUrl } from '../utils/constants';
import { logout } from './logout';

export const getGoals = createAsyncThunk(
  'goals',
  async ({ userId, userToken }) => {
    try {
      const response = await superagent
        .get(`${baseUrl}/users/${userId}/goals`)
        .set('Authorization', `Bearer ${userToken}`);

      const goals = response.body.data.goals;

      return { items: goals };
    } catch (err) {
      if (err.response) {
        const errorWrapper = JSON.parse(err.response.text);
        throw `${errorWrapper.error.message}`;
      }
      throw new Error(err);
    }
  }
);

const initialState = {};

const goalsReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(getGoals.pending, (state) => {
      const status = 'loading';
      return { status, ...state };
    })
    .addCase(getGoals.fulfilled, (state, action) => {
      const status = 'success';

      return { ...state, ...action.payload, status, error: {} };
    })
    .addCase(getGoals.rejected, (state, action) => {
      const error = action.error;
      const status = 'failed';
      return { ...state, status, error };
    })
    .addCase(logout, () => {
      return initialState;
    })
    .addDefaultCase((state) => {
      state;
    });
});

export default goalsReducer;
