import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import Login from '../Login';

const mockText = {
  intro: 'Welcome back hopper!',
  introMobile: 'Welcome back!',
  form: {
    emailField: {
      label: 'Email',
      placeholder: 'janedoe@example.com',
    },
    passwordField: {
      label: 'Password',
      placeholder: 'Password',
    },
    loginBtn: 'Log in',
  },
  signupRedirect: {
    text: "Don't have an account yet?",
    link: 'Sign up',
  },
};

describe('Renders Login screen', () => {
  const { intro, form, signupRedirect } = mockText;
  const { emailField, passwordField, loginBtn } = form;

  it('renders Login screen with form and go back to home page button', () => {
    renderWithProvidersAndRouter(<Login content={mockText} />);

    const pageIntro = screen.getByText(intro);
    const emailInput = screen.getByPlaceholderText(emailField.placeholder);
    const passwordInput = screen.getByLabelText(passwordField.label);
    const loginButton = screen.getByText(loginBtn);
    const noAccountText = screen.getByText(signupRedirect.text);
    const signUpLink = screen.getByText(signupRedirect.link);

    expect(pageIntro).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(noAccountText).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });

  it('renders Login screen with default text content', () => {
    renderWithProvidersAndRouter(<Login />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account yet?")).toBeInTheDocument();
  });

  it('redirects to Home screen when the "Go back" button is clicked', async () => {
    renderWithProvidersAndRouter(<Login content={mockText} />, {
      route: '/login',
    });

    const goBackBtn = screen.getAllByLabelText('Back to home page');
    await userEvent.click(goBackBtn[0]);
    expect(window.location.pathname).toBe('/');
  });

  it('redirects to SignUp screen when the "Sign up" link is clicked', async () => {
    renderWithProvidersAndRouter(<Login content={mockText} />, {
      route: '/login',
    });

    const signUpLink = screen.getByText(signupRedirect.link);
    await userEvent.click(signUpLink);
    expect(window.location.pathname).toBe('/signup');
  });
});
