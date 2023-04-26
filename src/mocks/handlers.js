// Mock Service Worker handlers.js
import { rest } from 'msw';
import { baseUrl } from '../utils/constants';
import { mockJwt, storageJwtKey, mockUserData } from './constants';

const loginHandler = rest.post(`${baseUrl}/logins`, (req, res, ctx) => {
  // Persist user's authentication token in Storage
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

const signupHandler = rest.post(`${baseUrl}/users`, (req, res, ctx) => {
  // Persist new user's authentication token in Storage
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

export const getUserHandlerException = rest.get(
  `${baseUrl}/users/:userId`,
  (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        error: { message: 'User not found' },
      })
    );
  }
);

const getGoalsHandler = rest.get(
  `${baseUrl}/users/:userId/goals`,
  (req, res, ctx) => {
    // const isAuthenticated = localStorage.getItem('jwt');
    // if (!isAuthenticated) {
    //   return res(
    //     ctx.status(401),
    //     ctx.json({
    //       errorMessage: 'Not authorized',
    //     })
    //   );
    // }

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
export const handlers = [
  loginHandler,
  signupHandler,
  getUserHandler,
  getGoalsHandler,
  // rest.get('/user', (req, res, ctx) => {
  //   // Check if the user is authenticated in this session
  //   const isAuthenticated = sessionStorage.getItem('is-authenticated');
  //   if (!isAuthenticated) {
  //     // If not authenticated, respond with a 403 error
  //     return res(
  //       ctx.status(403),
  //       ctx.json({
  //         errorMessage: 'Not authorized',
  //       })
  //     );
  //   }
  //   // If authenticated, return a mocked user details
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       username: 'admin',
  //     })
  //   );
  // }),
];
