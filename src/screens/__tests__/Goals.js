import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { mockJwt } from '../../mocks/constants';
import * as jwtModule from '../../utils/jwt';
import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import Goals from '../Goals';

describe('Goals component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => mockJwt),
        removeItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders screen for user without goals', async () => {
    let goalsContainer;

    await act(async () => {
      const { container } = renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
      goalsContainer = container;
    });

    expect(goalsContainer).toBeInTheDocument();
    expect(goalsContainer.innerHTML).toMatchSnapshot();

    const startDateLabel = screen.getByLabelText('Start date');
    const greeting = screen.getByText(/hi/i);
    const name = screen.getByText(/billie/i);
    const addGoalButton = screen.getByText('Set new goal');
    const logoutButton = screen.getByText(/log out/i);

    expect(startDateLabel).toBeInTheDocument();
    expect(greeting).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(addGoalButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it('logs out user and redirects to /login', async () => {
    let spy;
    spy = jest.spyOn(jwtModule, 'isExpired');
    spy.mockReturnValue(false);

    await act(async () => {
      renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
    });

    expect(spy).toHaveBeenCalled();
    expect(window.location.pathname).toBe('/goals');

    const logoutButton = screen.getByText(/log out/i);
    expect(logoutButton).toBeInTheDocument();

    await userEvent.click(logoutButton);
    expect(window.location.pathname).toBe('/login');
  });

  it('logs out user and redirects to /login when token is expired', async () => {
    let spy;
    spy = jest.spyOn(jwtModule, 'isExpired');
    spy.mockReturnValue(true);

    await act(async () => {
      renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
    });

    expect(spy).toHaveBeenCalled();
    expect(window.location.pathname).toBe('/login');
  });
});
