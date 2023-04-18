// Mock Service Worker handlers.js
import { rest } from 'msw';
import { baseUrl, localStorageJwtKey } from '../utils/constants';
import { mockJwt } from './constants';

export const handlers = [
  rest.post(`${baseUrl}/login`, (req, res, ctx) => {
    // Persist user's authentication in the session
    // sessionStorage.setItem('is-authenticated', 'true');
    localStorage.setItem(localStorageJwtKey, mockJwt);
    console.log('LOOOG LStorage', localStorage.getItem(localStorageJwtKey));
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
