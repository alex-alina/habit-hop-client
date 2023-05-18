import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import * as superagent from 'superagent';
import { baseUrl } from '../utils/constants';

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

const initialState = { items: [] };

const habitsReducer = createReducer(initialState, (builder) => {
  builder

    // .addCase(getHabits.pending, (state) => {
    //   const status = 'loading';
    //   return { status, ...state };
    // })
    // .addCase(getHabits.fulfilled, (state, action) => {
    //   const status = 'success';

    //   return { ...state, ...action.payload, status, error: {} };
    // })
    // .addCase(getHabits.rejected, (state, action) => {
    //   const error = action.error;
    //   const status = 'failed';
    //   return { ...state, status, error };
    // })
    .addCase(addHabit.pending, (state) => {
      const status = 'loading';
      return { status, ...state };
    })
    .addCase(addHabit.fulfilled, (state, action) => {
      const status = 'success';
      const currentHabits = state.items;
      const newHabits = [...currentHabits, action.payload];

      return { ...state, items: newHabits, status, error: {} };
    })
    .addCase(addHabit.rejected, (state, action) => {
      const error = action.error;
      const status = 'failed';
      return { ...state, status, error };
    })

    .addDefaultCase((state) => {
      state;
    });
});

export default habitsReducer;
