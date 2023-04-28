import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Home from '../Home';

const mockText = {
  intro: 'Hello hopper',
  loginBtn: 'Log in',
  signupBtn: 'Sign up',
};

describe('Renders Home screen', () => {
  it('renders Home screen with login and sign up buttons', () => {
    renderWithProvidersAndRouter(<Home content={mockText} />);

    const intro = screen.getByText(mockText.intro);
    const loginBtn = screen.getByText(mockText.loginBtn);
    const signupBtn = screen.getByText(mockText.signupBtn);
    expect(intro).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(signupBtn).toBeInTheDocument();
  });

  it('redirects to Login screen when Log In button is clicked', async () => {
    renderWithProvidersAndRouter(<Home content={mockText} />, {
      route: '/',
    });

    const loginBtn = screen.getByText(mockText.loginBtn);
    await userEvent.click(loginBtn);
    expect(window.location.pathname).toBe('/login');
  });
  it('redirects to Signup screen whe Sign Up button is clicked', async () => {
    renderWithProvidersAndRouter(<Home content={mockText} />, {
      route: '/',
    });

    const signupBtn = screen.getByText(mockText.signupBtn);
    await userEvent.click(signupBtn);
    expect(window.location.pathname).toBe('/signup');
  });
});
