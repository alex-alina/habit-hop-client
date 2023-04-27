import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  mockGoalData1,
  editGoalData,
  mockGoalFormData,
  mockJwt,
} from '../../mocks/constants';
import { getEmptyGoalsHandler } from '../../mocks/handlers';
import { server } from '../../mocks/server';
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

  it('renders screen for user that has no goals', async () => {
    server.use(getEmptyGoalsHandler);

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
    expect(window.location.pathname).not.toBe('/goals');
    expect(window.location.pathname).toBe('/login');
  });

  it('adds new goal for user without goals', async () => {
    server.use(getEmptyGoalsHandler);
    let goalsContainer;
    let reRender;

    await act(async () => {
      const { container, rerender } = renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
      goalsContainer = container;
      reRender = rerender;
    });

    expect(goalsContainer).toBeInTheDocument();
    expect(goalsContainer.innerHTML).toMatchSnapshot();

    const goalDescription = screen.getByLabelText('Goal description');
    const goalPriority = screen.getByLabelText('Goal priority');
    const startDate = screen.getByLabelText('Start date');
    const endDate = screen.getByLabelText('End date');
    const addGoalButton = screen.getByText('Set new goal');

    await userEvent.type(goalDescription, mockGoalFormData.goalDefinition);
    await userEvent.type(goalPriority, mockGoalFormData.priority);
    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'main' })
    );
    expect(screen.getByRole('option', { name: 'main' }).selected).toBe(true);
    await userEvent.type(startDate, mockGoalFormData.startDate);
    await userEvent.type(endDate, mockGoalFormData.endDate);
    await userEvent.click(addGoalButton);

    await act(async () => {
      reRender(<Goals />, {
        route: '/goals',
      });
    });
    const addButton = screen.getByText('Add goal');
    const titleSegment = screen.getByText(/overview/i);
    const name = screen.getByText(/billie/i);
    const goalCardButton = screen.getByText(/show habits/i);
    expect(titleSegment).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(goalCardButton).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  it('displays three goals cards and info banner for user with three goals', async () => {
    await act(async () => {
      renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
    });

    const addGoalButtons = screen.getAllByText(/show habits/i);
    const banner = screen.getByText(
      'You can add a maximum of three goals. Edit or replace your goals to fit your current needs.'
    );

    expect(banner).toBeInTheDocument();
    expect(addGoalButtons).toHaveLength(3);
  });

  it('closes the info banner for user with three goals', async () => {
    await act(async () => {
      renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
    });

    const banner = screen.queryByText(
      'You can add a maximum of three goals. Edit or replace your goals to fit your current needs.'
    );

    expect(banner).toBeInTheDocument();
    await userEvent.click(
      screen.getByRole('button', { name: /close banner/i })
    );
    expect(banner).not.toBeInTheDocument();
  });

  it('deletes one goal and then displays two goals cards', async () => {
    let reRender;

    await act(async () => {
      const { rerender } = renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
      reRender = rerender;
    });

    const deleteGoalButtons = screen.getAllByText(/delete/i);
    expect(deleteGoalButtons).toHaveLength(3);

    await userEvent.click(deleteGoalButtons[0]);

    await act(async () => {
      reRender(<Goals />, {
        route: '/goals',
      });
    });

    const deleteButtons = screen.getAllByText(/delete/i);
    expect(deleteButtons).toHaveLength(2);

    const addGoalBtn = screen.getByText(/add goal/i);
    expect(addGoalBtn).toBeInTheDocument();
    await userEvent.click(addGoalBtn);
    await act(async () => {
      reRender(<Goals />, {
        route: '/goals',
      });
    });
    const addGoal = screen.getByText(/add goal/i);
    expect(addGoal).toBeInTheDocument();
  });

  it('edits the goal description of the first goal in the list', async () => {
    let reRender;

    await act(async () => {
      const { rerender } = renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
      reRender = rerender;
    });
    expect(screen.getByText(mockGoalData1.goalDefinition)).toBeInTheDocument();

    const editGoalButtons = screen.getAllByText('Edit');
    expect(editGoalButtons).toHaveLength(3);
    expect(
      screen.queryByText(editGoalData.goalDefinition)
    ).not.toBeInTheDocument();

    await userEvent.click(editGoalButtons[0]);
    await userEvent.type(
      screen.getByLabelText('Goal description'),
      editGoalData.goalDefinition
    );
    await userEvent.click(screen.getByText('Set new goal'));

    await act(async () => {
      reRender(<Goals />, {
        route: '/goals',
      });
    });

    expect(screen.getByText(editGoalData.goalDefinition)).toBeInTheDocument();
  });
});

// expect(() => validateGoalDescription(value, 14, 5)).toThrow(Error);
