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

export const addGoal = createAsyncThunk(
  'goals/addGoal',
  async ({ userId, userToken, goal }) => {
    try {
      const response = await superagent
        .post(`${baseUrl}/users/${userId}/goals`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(goal);

      const newGoal = response.body.data.goal;

      return newGoal;
    } catch (err) {
      if (err.response) {
        const errorWrapper = JSON.parse(err.response.text);
        throw `${errorWrapper.error.message}`;
      }
      throw new Error(err);
    }
  }
);

export const deleteGoal = createAsyncThunk(
  'goals/deleteGoal',
  async ({ userId, userToken, goalId }) => {
    try {
      const response = await superagent
        .delete(`${baseUrl}/users/${userId}/goals/${goalId}`)
        .set('Authorization', `Bearer ${userToken}`);

      const resStatus = response.status;

      return { resStatus, goalId };
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
    .addCase(addGoal.pending, (state) => {
      const status = 'loading';
      return { status, ...state };
    })
    .addCase(addGoal.fulfilled, (state, action) => {
      const status = 'success';
      const currentGoals = state.items;
      const newGoals = [...currentGoals, action.payload];
      return { ...state, items: newGoals, status, error: {} };
    })
    .addCase(addGoal.rejected, (state, action) => {
      const error = action.error;
      const status = 'failed';
      return { ...state, status, error };
    })
    .addCase(deleteGoal.pending, (state) => {
      const status = 'loading';
      return { status, ...state };
    })
    .addCase(deleteGoal.fulfilled, (state, action) => {
      const status = 'success';
      const { goalId, resStatus } = action.payload;
      const newGoals = state.items.filter((goal) => goal.id !== goalId);

      return { ...state, items: newGoals, status, resStatus, error: {} };
    })
    .addCase(deleteGoal.rejected, (state, action) => {
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
