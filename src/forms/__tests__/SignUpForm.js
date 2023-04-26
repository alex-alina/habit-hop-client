import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { mockJwt, storageJwtKey } from '../../mocks/constants';
import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import SignUpForm from '../SignUpForm';
import { server } from '../../mocks/server';
import { signupHandlerException } from '../../mocks/handlers';

const content = {
  firstNameField: {
    label: 'First Name',
    placeholder: 'First name',
  },
  lastNameField: {
    label: 'Last Name',
    placeholder: 'Last name',
  },
  emailField: {
    label: 'Email',
    placeholder: 'janedoe@example.com',
  },
  passwordField: {
    label: 'Password',
    placeholder: 'Password',
  },
  confirmPasswordField: {
    label: 'Confirm Password',
    placeholder: 'Confirm Password',
  },
  signupBtn: 'Sign up',
};

const credentials = {
  firstName: 'Billie',
  lastName: 'Test',
  email: 'test@example.com',
  password: 'testPass',
  confirmPassword: 'testPass',
};

describe('SignUpForm component', () => {
  it('allows user to sign up and redirects them to /goals', async () => {
    renderWithProvidersAndRouter(<SignUpForm content={content} />, {
      route: '/signup',
    });

    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPassInput = screen.getByLabelText('Confirm Password');
    const signupBtn = screen.getByText('Sign up');

    expect(emailInput).not.toHaveValue(credentials.email);
    expect(passwordInput).not.toHaveValue(credentials.password);
    expect(signupBtn).toBeInTheDocument();

    await userEvent.type(firstNameInput, credentials.firstName);
    await userEvent.type(lastNameInput, credentials.lastName);
    await userEvent.type(emailInput, credentials.email);
    await userEvent.type(passwordInput, credentials.password);
    await userEvent.type(confirmPassInput, credentials.confirmPassword);
    await userEvent.click(signupBtn);

    expect(emailInput).toHaveValue(credentials.email);
    expect(passwordInput).toHaveValue(credentials.password);

    expect(window.localStorage.getItem(storageJwtKey)).toBe(mockJwt);
    expect(window.location.pathname).toBe('/goals');
  });

  it('displays error message when signup fails', async () => {
    server.use(signupHandlerException);

    renderWithProvidersAndRouter(<SignUpForm content={content} />, {
      route: '/signup',
    });

    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPassInput = screen.getByLabelText('Confirm Password');
    const signupBtn = screen.getByText('Sign up');
    const errorMessage = screen.queryByText(
      'A user with this email already exists'
    );

    expect(errorMessage).not.toBeInTheDocument();

    await userEvent.type(firstNameInput, credentials.firstName);
    await userEvent.type(lastNameInput, credentials.lastName);
    await userEvent.type(emailInput, credentials.email);
    await userEvent.type(passwordInput, credentials.password);
    await userEvent.type(confirmPassInput, credentials.confirmPassword);
    await userEvent.click(signupBtn);

    const errorDisplay = screen.getByText(
      'A user with this email already exists'
    );

    expect(errorDisplay).toBeInTheDocument();
    expect(window.location.pathname).toBe('/signup');
  });
});
