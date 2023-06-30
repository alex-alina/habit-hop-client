import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import * as superagent from 'superagent';
import { baseUrl } from '../utils/constants';

export const updateHabits = (habits, habit) => {
  const habitGoalId = habit.goal.id;
  const updatedHabits = { ...habits };

  updatedHabits[habitGoalId] = [...updatedHabits[habitGoalId], habit];
  return updatedHabits;
};

export const removeHabit = (state, goalId, habitId) => {
  const newGoalSpecificHabits = state.items[goalId].filter(
    (habit) => habit.id !== habitId
  );
  const newHabits = { ...state.items, [goalId]: newGoalSpecificHabits };
  return newHabits;
};

export const updateEditedInHabits = (habits, editedHabit) => {
  const currentGoalId = editedHabit.goal.id;
  const currentGoalHabits = habits[currentGoalId];
  const filteredHabits = currentGoalHabits.filter(
    (habit) => habit.id !== editedHabit.id
  );

  const updatedHabits = { ...habits };
  updatedHabits[currentGoalId] = [...filteredHabits, editedHabit];
  return updatedHabits;
};

export const getHabits = createAsyncThunk(
  'habits',
  async ({ userId, userToken, goalId }) => {
    try {
      const response = await superagent
        .get(`${baseUrl}/users/${userId}/goals/${goalId}/habits`)
        .set('Authorization', `Bearer ${userToken}`);

      const habits = response.body.data.habits;
      return { [goalId]: habits };
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

export const addHabit = createAsyncThunk(
  'habits/addHabit',
  async ({ userId, userToken, goalId, habit }) => {
    try {
      const response = await superagent
        .post(`${baseUrl}/users/${userId}/goals/${goalId}/habits`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(habit);

      const newHabit = response.body.data.habit;

      return newHabit;
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

export const deleteHabit = createAsyncThunk(
  'habits/deleteHabit',
  async ({ userId, userToken, goalId, habitId }) => {
    try {
      const response = await superagent
        .delete(`${baseUrl}/users/${userId}/goals/${goalId}/habits/${habitId}`)
        .set('Authorization', `Bearer ${userToken}`);

      const resStatus = response.status;

      return { resStatus, goalId, habitId };
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

export const editHabit = createAsyncThunk(
  'habits/editHabit',
  async ({ userId, userToken, goalId, habitId, updatedHabit }) => {
    try {
      const response = await superagent
        .patch(`${baseUrl}/users/${userId}/goals/${goalId}/habits/${habitId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updatedHabit);

      const editedHabit = response.body.data.habit;

      return editedHabit;
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

const habitsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getHabits.pending, (state) => {
      const status = 'loading';
      return { status, ...state };
    })
    .addCase(getHabits.fulfilled, (state, action) => {
      const status = 'success';
      const currentHabits = state.items;
      const newHabits = action.payload;
      const finalHabits = { ...currentHabits, ...newHabits };
      return { ...state, items: finalHabits, status, error: {} };
    })
    .addCase(getHabits.rejected, (state, action) => {
      const error = action.error;
      const status = 'failed';
      return { ...state, status, error };
    })
    .addCase(addHabit.pending, (state) => {
      const status = 'loading';
      return { status, ...state };
    })
    .addCase(addHabit.fulfilled, (state, action) => {
      const status = 'success';
      const currentHabits = state.items;
      const newHabit = action.payload;
      const newHabits = updateHabits(currentHabits, newHabit);

      return { ...state, items: newHabits, status, error: {} };
    })
    .addCase(addHabit.rejected, (state, action) => {
      const error = action.error;
      const status = 'failed';
      return { ...state, status, error };
    })
    .addCase(deleteHabit.pending, (state) => {
      const status = 'loading';
      return { status, ...state };
    })
    .addCase(deleteHabit.fulfilled, (state, action) => {
      const status = 'success';
      const { resStatus, goalId, habitId } = action.payload;
      const newGoals = removeHabit(state, goalId, habitId);

      return { ...state, items: newGoals, status, resStatus, error: {} };
    })
    .addCase(deleteHabit.rejected, (state, action) => {
      const error = action.error;
      const status = 'failed';
      return { ...state, status, error };
    })
    .addCase(editHabit.pending, (state) => {
      const status = 'loading';
      return { status, ...state };
    })
    .addCase(editHabit.fulfilled, (state, action) => {
      const status = 'success';
      const currentHabits = state.items;
      const editedHabit = action.payload;
      const updatedHabits = updateEditedInHabits(currentHabits, editedHabit);
      return { ...state, items: updatedHabits, status, error: {} };
    })
    .addCase(editHabit.rejected, (state, action) => {
      const error = action.error;
      const status = 'failed';
      return { ...state, status, error };
    })
    .addDefaultCase((state) => {
      state;
    });
});

export default habitsReducer;
