// Mock Service Worker handlers.js
import { rest } from 'msw';
import { baseUrl } from '../utils/constants';
import { mockJwt, storageJwtKey } from './constants';

export const handlers = [
  rest.post(`${baseUrl}/logins`, (req, res, ctx) => {
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
  }),
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
