import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import Signup from '../SignUp';

const mockText = {
  intro: 'Create account',
  form: {
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
  },
};

describe('Renders SignUp screen', () => {
  const { intro, form } = mockText;
  const {
    firstNameField,
    lastNameField,
    emailField,
    passwordField,
    confirmPasswordField,
    signupBtn,
  } = form;

  it('renders SignUp screen with form and go back to home page button', () => {
    renderWithProvidersAndRouter(<Signup content={mockText} />);

    const formIntro = screen.getByText(intro);
    const firstNameInput = screen.getByLabelText(firstNameField.label);
    const lastNameInput = screen.getByLabelText(lastNameField.label);
    const emailInput = screen.getByPlaceholderText(emailField.placeholder);
    const passwordInput = screen.getByLabelText(passwordField.label);
    const confirmPassInput = screen.getByLabelText(confirmPasswordField.label);
    const signupButton = screen.getByText(signupBtn);

    expect(formIntro).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPassInput).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  it('renders SignUp with default text content', () => {
    renderWithProvidersAndRouter(<Signup />);
    expect(screen.getByText('Create account')).toBeInTheDocument();
  });

  it('redirects to Home screen when the "Go back" button is clicked', async () => {
    renderWithProvidersAndRouter(<Signup content={mockText} />, {
      route: '/signup',
    });

    const goBackBtn = screen.getAllByLabelText('Back to home page');
    await userEvent.click(goBackBtn[0]);
    expect(window.location.pathname).toBe('/');
  });
});
