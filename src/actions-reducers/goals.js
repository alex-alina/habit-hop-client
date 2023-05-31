import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import * as superagent from 'superagent';
import { baseUrl } from '../utils/constants';
import { logout } from './logout';

const formatGoal = (goal) => {
  const { id, goalDefinition, priority, startDate, endDate } = goal;
  const formattedGoal = {
    id,
    goalDefinition,
    priority,
    startDate,
    endDate,
  };

  return formattedGoal;
};

export const getGoal = createAsyncThunk(
  'goals/currentGoal',
  async ({ userId, userToken, goalId }) => {
    try {
      const response = await superagent
        .get(`${baseUrl}/users/${userId}/goals/${goalId}`)
        .set('Authorization', `Bearer ${userToken}`);

      const goal = response.body.data.goal;
      const formattedGoal = formatGoal(goal);
      return { currentGoal: formattedGoal };
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

export const getGoals = createAsyncThunk(
  'goals',
  async ({ userId, userToken }) => {
    try {
      const response = await superagent
        .get(`${baseUrl}/users/${userId}/goals`)
        .set('Authorization', `Bearer ${userToken}`);

      const goals = response.body.data.goals;
      const formattedGoals = goals.map((goal) => formatGoal(goal));
      return { items: formattedGoals };
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

export const addGoal = createAsyncThunk(
  'goals/addGoal',
  async ({ userId, userToken, goal }) => {
    try {
      const response = await superagent
        .post(`${baseUrl}/users/${userId}/goals`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(goal);

      const newGoal = response.body.data.goal;
      const formattedGoal = formatGoal(newGoal);

      return formattedGoal;
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
      if (err.message.match(/Request has been terminated/i)) {
        throw new Error(
          'There are issues with the server. Please try again later'
        );
      }
      throw new Error(err);
    }
  }
);

export const editGoal = createAsyncThunk(
  'goals/editGoal',
  async ({ userId, userToken, goalId, updatedGoal }) => {
    try {
      const response = await superagent
        .patch(`${baseUrl}/users/${userId}/goals/${goalId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updatedGoal);

      const newGoal = response.body.data.goal;
      const formattedGoal = formatGoal(newGoal);

      return formattedGoal;
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

const goalsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getGoal.pending, (state) => {
      const status = 'loading';
      return { status, ...state };
    })
    .addCase(getGoal.fulfilled, (state, action) => {
      const status = 'success';
      return { ...state, ...action.payload, status, error: {} };
    })
    .addCase(getGoal.rejected, (state, action) => {
      const error = action.error;
      const status = 'failed';
      return { ...state, status, error };
    })
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
    .addCase(editGoal.pending, (state) => {
      const status = 'loading';
      return { status, ...state };
    })
    .addCase(editGoal.fulfilled, (state, action) => {
      const status = 'success';
      const updatedGoal = action.payload;
      const unchangedGoals = state.items.filter(
        (goal) => goal.id !== updatedGoal.id
      );
      const newGoals = [...unchangedGoals, updatedGoal];

      return { ...state, items: newGoals, status, error: {} };
    })
    .addCase(editGoal.rejected, (state, action) => {
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
