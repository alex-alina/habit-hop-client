// Mock Service Worker handlers.js
import { rest } from 'msw';
import { baseUrl } from '../utils/constants';
import {
  editGoalData,
  fourHabitsMockData,
  mockGoalData1,
  mockGoalData2,
  mockGoalData3,
  mockHabitData,
  mockHabitsData,
  mockJwt,
  mockUserData,
  storageJwtKey,
} from './constants';

export const ServerDownError = (url) =>
  rest.post(url, (req, res) => {
    return res.networkError('Request has been terminated');
  });

//Login handlers
const loginHandler = rest.post(`${baseUrl}/logins`, (req, res, ctx) => {
  localStorage.setItem(storageJwtKey, mockJwt);

  return res(
    ctx.json({
      data: {
        jwt: mockJwt,
      },
    }),
    ctx.status(200)
  );
});

export const loginHandlerException = rest.post(
  `${baseUrl}/logins`,
  (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({
        error: { message: 'Incorrect password or email' },
      })
    );
  }
);

export const loginServerDownError = ServerDownError(`${baseUrl}/logins`);

export const loginNetworkError = rest.post(`${baseUrl}/logins`, (req, res) => {
  return res.networkError('Test: some other network error');
});

//Signup handlers
const signupHandler = rest.post(`${baseUrl}/users`, (req, res, ctx) => {
  localStorage.setItem(storageJwtKey, mockJwt);

  return res(
    ctx.json({
      data: {
        jwt: mockJwt,
        userData: mockUserData,
      },
    }),
    ctx.status(201)
  );
});

export const signupHandlerException = rest.post(
  `${baseUrl}/users`,
  (req, res, ctx) => {
    return res(
      ctx.status(409),
      ctx.json({
        error: { message: 'A user with this email already exists' },
      })
    );
  }
);

export const signupServerDownError = ServerDownError(`${baseUrl}/users`);

export const signupNetworkError = rest.post(`${baseUrl}/users`, (req, res) => {
  return res.networkError('Test: some other network error');
});

//Get user handler
const getUserHandler = rest.get(`${baseUrl}/users/:userId`, (req, res, ctx) => {
  return res(
    ctx.json({
      data: {
        user: mockUserData,
      },
    }),
    ctx.status(200)
  );
});

export const getUserException = rest.get(
  `${baseUrl}/users/:userId`,
  (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        error: { message: 'Test Error: User not found' },
      })
    );
  }
);

export const getUserServerDownError = rest.get(
  `${baseUrl}/users/:userId`,
  (req, res) => {
    return res.networkError('Request has been terminated');
  }
);

export const getUserNetworkError = rest.get(
  `${baseUrl}/users/:userId`,
  (req, res) => {
    return res.networkError('Test: some other network error');
  }
);

//Goals handlers
const getGoalHandler = rest.get(
  `${baseUrl}/users/:userId/goals/:goalId`,
  (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          goal: mockGoalData1,
        },
      }),
      ctx.status(200)
    );
  }
);

export const getGoalException = rest.get(
  `${baseUrl}/users/:userId/goals/:goalId`,
  (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        error: { message: 'Test Error: Goal not found' },
      })
    );
  }
);

export const getGoalServerDownError = rest.get(
  `${baseUrl}/users/:userId/goals/:goalId`,
  (req, res) => {
    return res.networkError('Request has been terminated');
  }
);

export const getGoalNetworkError = rest.get(
  `${baseUrl}/users/:userId/goals/:goalId`,
  (req, res) => {
    return res.networkError('Test: some other network error');
  }
);

const getGoalsHandler = rest.get(
  `${baseUrl}/users/:userId/goals`,
  (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          goals: [mockGoalData1, mockGoalData2],
        },
      }),
      ctx.status(200)
    );
  }
);

export const getThreeGoalsHandler = rest.get(
  `${baseUrl}/users/:userId/goals`,
  (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          goals: [mockGoalData1, mockGoalData2, mockGoalData3],
        },
      }),
      ctx.status(200)
    );
  }
);

export const getEmptyGoalsHandler = rest.get(
  `${baseUrl}/users/:userId/goals`,
  (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          goals: [],
        },
      }),
      ctx.status(200)
    );
  }
);

export const getGoalsException = rest.get(
  `${baseUrl}/users/:userId/goals`,
  (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        error: { message: 'Test Error: Goals not found' },
      })
    );
  }
);

export const getGoalsServerDownError = rest.get(
  `${baseUrl}/users/:userId/goals`,
  (req, res) => {
    return res.networkError('Request has been terminated');
  }
);

export const getGoalsNetworkError = rest.get(
  `${baseUrl}/users/:userId/goals`,
  (req, res) => {
    return res.networkError('Test: some other network error');
  }
);

const addGoalHandler = rest.post(
  `${baseUrl}/users/:userId/goals`,
  (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          goal: mockGoalData1,
        },
      }),
      ctx.status(201)
    );
  }
);

export const addGoalException = rest.post(
  `${baseUrl}/users/:userId/goals`,
  (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        error: { message: 'Test Error: Goal was not added' },
      })
    );
  }
);

export const addGoalNetworkError = rest.post(
  `${baseUrl}/users/:userId/goals`,
  (req, res) => {
    return res.networkError('Test: some other network error');
  }
);

export const addGoalServerDownError = ServerDownError(
  `${baseUrl}/users/:userId/goals`
);

const editGoalHandler = rest.patch(
  `${baseUrl}/users/:userId/goals/:goalId`,
  (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          goal: editGoalData,
        },
      }),
      ctx.status(201)
    );
  }
);

export const editGoalException = rest.patch(
  `${baseUrl}/users/:userId/goals/:goalId`,
  (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        error: { message: 'Test Error: Goal was not edited' },
      })
    );
  }
);

export const editGoalNetworkError = rest.patch(
  `${baseUrl}/users/:userId/goals/:goalId`,
  (req, res) => {
    return res.networkError('Test: some other network error');
  }
);
export const editGoalServerDownError = rest.patch(
  `${baseUrl}/users/:userId/goals/:goalId`,
  (req, res) => {
    return res.networkError('Request has been terminated');
  }
);

const deleteGoalHandler = rest.delete(
  `${baseUrl}/users/:userId/goals/:goalId`,
  (req, res, ctx) => {
    return res(ctx.status(204));
  }
);

export const deleteGoalException = rest.delete(
  `${baseUrl}/users/:userId/goals/:goalId`,
  (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        error: { message: 'Test Error: Goal was not deleted' },
      })
    );
  }
);

export const deleteGoalNetworkError = rest.delete(
  `${baseUrl}/users/:userId/goals/:goalId`,
  (req, res) => {
    return res.networkError('Test: some other network error');
  }
);
export const deleteGoalServerDownError = rest.delete(
  `${baseUrl}/users/:userId/goals/:goalId`,
  (req, res) => {
    return res.networkError('Request has been terminated');
  }
);

// Habits handlers
const getHabitsHandler = rest.get(
  `${baseUrl}/users/:userId/goals/:goalId/habits`,
  (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          habits: mockHabitsData,
        },
      }),
      ctx.status(201)
    );
  }
);

export const getZeroHabitsHandler = rest.get(
  `${baseUrl}/users/:userId/goals/:goalId/habits`,
  (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          habits: [],
        },
      }),
      ctx.status(201)
    );
  }
);

export const getFourHabitsHandler = rest.get(
  `${baseUrl}/users/:userId/goals/:goalId/habits`,
  (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          habits: fourHabitsMockData,
        },
      }),
      ctx.status(201)
    );
  }
);

export const getHabitsException = rest.get(
  `${baseUrl}/users/:userId/goals/:goalId/habits`,
  (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        error: { message: 'Test Error: Habits not found' },
      })
    );
  }
);

export const getHabitsServerDownError = rest.get(
  `${baseUrl}/users/:userId/goals/:goalId/habits`,
  (req, res) => {
    return res.networkError('Request has been terminated');
  }
);

export const getHabitsNetworkError = rest.get(
  `${baseUrl}/users/:userId/goals/:goalId/habits`,
  (req, res) => {
    return res.networkError('Test: some other network error');
  }
);

const addHabitHandler = rest.post(
  `${baseUrl}/users/:userId/goals/:goalId/habits`,
  (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          habit: mockHabitData,
        },
      }),
      ctx.status(201)
    );
  }
);

export const addHabitException = rest.post(
  `${baseUrl}/users/:userId/goals/:goalId/habits`,
  (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        error: { message: 'Test Error: Habit was not added' },
      })
    );
  }
);

export const addHabitNetworkError = rest.post(
  `${baseUrl}/users/:userId/goals/:goalId/habits`,
  (req, res) => {
    return res.networkError('Test: some other network error');
  }
);

export const addHabitServerDownError = rest.post(
  `${baseUrl}/users/:userId/goals/:goalId/habits`,
  (req, res) => {
    return res.networkError('Request has been terminated');
  }
);

const deleteHabitHandler = rest.delete(
  `${baseUrl}/users/:userId/goals/:goalId/habits/:habitId`,
  (req, res, ctx) => {
    return res(ctx.status(204));
  }
);

export const deleteHabitException = rest.delete(
  `${baseUrl}/users/:userId/goals/:goalId/habits/:habitId`,
  (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        error: { message: 'Test Error: Habit was not deleted' },
      })
    );
  }
);

export const deleteHabitNetworkError = rest.delete(
  `${baseUrl}/users/:userId/goals/:goalId/habits/:habitId`,
  (req, res) => {
    return res.networkError('Test: some other network error');
  }
);
export const deleteHabitServerDownError = rest.delete(
  `${baseUrl}/users/:userId/goals/:goalId/habits/:habitId`,
  (req, res) => {
    return res.networkError('Request has been terminated');
  }
);

export const handlers = [
  loginHandler,
  signupHandler,
  getUserHandler,
  getGoalHandler,
  getGoalsHandler,
  addGoalHandler,
  deleteGoalHandler,
  editGoalHandler,
  getHabitsHandler,
  addHabitHandler,
  deleteHabitHandler,
];
