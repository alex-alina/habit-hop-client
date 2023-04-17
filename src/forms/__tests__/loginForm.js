import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/testUtils';
import LoginForm from '../LoginForm';

// import { mockJwt } from '../../mocks/constants';
// import { localStorageJwtKey } from '../utils/constants';

describe('login', () => {
  it('allows user to log in', async () => {
    renderWithProviders(<LoginForm />, { route: '/goals' });
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const logInBtn = screen.getByText('Log in');

    userEvent.type(emailInput, 'Ella');
    userEvent.type(passwordInput, 'testPassword');
    userEvent.click(logInBtn);

    await waitFor(() => expect(window.location.pathname).toBe('/goals'));
  });
});
