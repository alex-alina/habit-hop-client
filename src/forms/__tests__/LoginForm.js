import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { mockJwt, storageJwtKey } from '../../mocks/constants';
import {
  loginHandlerException,
  loginNetworkError,
  loginServerDownError,
} from '../../mocks/handlers';
import { server } from '../../mocks/server';
import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import LoginForm from '../LoginForm';

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
const incorrectCredentials = {
  email: 'ella@example.com',
  password: 'azsxwerti',
};

describe('LoginForm component', () => {
  it('renders form and redirects user /goals after successful submit', async () => {
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

    expect(window.localStorage.getItem(storageJwtKey)).toBe(mockJwt);
    expect(window.location.pathname).toBe('/goals');
  });

  it('displays error message when login fails', async () => {
    server.use(loginHandlerException);

    renderWithProvidersAndRouter(<LoginForm content={content} />, {
      route: '/login',
    });

    const noErrorMessage = screen.queryByText('Incorrect password or email');
    expect(noErrorMessage).not.toBeInTheDocument();

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const logInBtn = screen.getByText('Log in');

    await userEvent.type(emailInput, incorrectCredentials.email);
    await userEvent.type(passwordInput, incorrectCredentials.password);
    await userEvent.click(logInBtn);

    const errorMessage = screen.getByText('Incorrect password or email');
    expect(errorMessage).toBeInTheDocument();
    expect(window.location.pathname).toBe('/login');
  });

  it('displays network error message', async () => {
    server.use(loginNetworkError);

    renderWithProvidersAndRouter(<LoginForm content={content} />, {
      route: '/login',
    });

    await userEvent.type(screen.getByLabelText('Email'), credentials.email);
    await userEvent.type(
      screen.getByLabelText('Password'),
      credentials.password
    );
    await userEvent.click(screen.getByText('Log in'));

    expect(
      screen.getByText(/Test: some other network error/i)
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe('/login');
  });

  it('displays server down error message', async () => {
    server.use(loginServerDownError);

    renderWithProvidersAndRouter(<LoginForm content={content} />, {
      route: '/login',
    });

    await userEvent.type(screen.getByLabelText('Email'), credentials.email);
    await userEvent.type(
      screen.getByLabelText('Password'),
      credentials.password
    );
    await userEvent.click(screen.getByText('Log in'));

    expect(
      screen.getByText(
        /There are issues with the server. Please try again later/i
      )
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe('/login');
  });

  it('does not submit invalid values', async () => {
    renderWithProvidersAndRouter(<LoginForm content={content} />, {
      route: '/login',
    });

    const emailInput = screen.getByLabelText('Email');
    const logInBtn = screen.getByText('Log in');

    await userEvent.type(emailInput, 'alex@gmail');
    await userEvent.click(logInBtn);

    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/login');
  });
});
