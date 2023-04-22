import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { mockJwt, storageJwtKey } from '../../mocks/constants';
import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import LoginForm from '../LoginForm';

const credentials = { email: 'ella@example.com', password: 'azsxdcfv' };

describe('login form', () => {
  it('allows user to log in and redirects them to /goals', async () => {
    renderWithProvidersAndRouter(<LoginForm />, {
      route: '/login',
    });

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const logInBtn = screen.getByText('Log in');
    expect(emailInput).not.toHaveValue(credentials.email);
    expect(passwordInput).not.toHaveValue(credentials.password);

    await userEvent.type(emailInput, credentials.email);
    await userEvent.type(passwordInput, credentials.password);
    await userEvent.click(logInBtn);

    expect(emailInput).toHaveValue(credentials.email);
    expect(passwordInput).toHaveValue(credentials.password);
    expect(logInBtn).toBeInTheDocument();

    expect(window.localStorage.getItem(storageJwtKey)).toBe(mockJwt);
    expect(window.location.pathname).toBe('/goals');
  });
});
