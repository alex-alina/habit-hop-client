import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { mockJwt, storageJwtKey } from '../../mocks/constants';
import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import LoginForm from '../LoginForm';
import { server } from '../../mocks/server';
import { loginHandlerException } from '../../mocks/handlers';

const content = {
  emailField: {
    label: 'Email',
    placeholder: 'janedoe@example.com',
  },
  passwordField: {
    label: 'Password',
    placeholder: 'Password',
  },
  loginBtn: 'Log in',
};

const credentials = { email: 'ella@example.com', password: 'azsxdcfv' };
const invalidCredentials = { email: 'ella@example.com', password: 'azsxwerti' };

describe('LoginForm component', () => {
  it('allows user to log in and redirects them to /goals', async () => {
    renderWithProvidersAndRouter(<LoginForm content={content} />, {
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

  it('displays error message when login fails', async () => {
    server.use(loginHandlerException);

    renderWithProvidersAndRouter(<LoginForm content={content} />, {
      route: '/login',
    });

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const logInBtn = screen.getByText('Log in');
    const errorMessage = screen.queryByText('Incorrect password or email');

    expect(errorMessage).not.toBeInTheDocument();

    await userEvent.type(emailInput, invalidCredentials.email);
    await userEvent.type(passwordInput, invalidCredentials.password);
    await userEvent.click(logInBtn);

    const errorDisplay = screen.getByText('Incorrect password or email');
    expect(errorDisplay).toBeInTheDocument();

    expect(window.location.pathname).toBe('/login');
  });
});
