import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import LoginForm from '../LoginForm';

import { mockJwt } from '../../mocks/constants';
import { localStorageJwtKey } from '../../utils/constants';

describe('login form', () => {
  it('allows user to log in', async () => {
    renderWithProvidersAndRouter(<LoginForm />, { route: '/login' });
    console.log(window.localStorage);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const logInBtn = screen.getByText('Log in');

    userEvent.type(emailInput, 'Ella');
    userEvent.type(passwordInput, 'testPassword');
    userEvent.click(logInBtn);
    await waitFor(() =>
      expect(window.localStorage.getItem(localStorageJwtKey)).toBe(mockJwt)
    );
    await waitFor(() => expect(window.location.pathname).toBe('/goals'));
  });
});
