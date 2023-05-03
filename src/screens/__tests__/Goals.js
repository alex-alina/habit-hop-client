import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  editGoalData,
  mockGoalData1,
  mockGoalFormData,
  mockJwt,
} from '../../mocks/constants';
import {
  addGoalException,
  addGoalNetworkError,
  addGoalServerDownError,
  deleteGoalException,
  deleteGoalNetworkError,
  deleteGoalServerDownError,
  editGoalException,
  editGoalNetworkError,
  editGoalServerDownError,
  getEmptyGoalsHandler,
  getGoalsException,
  getGoalsNetworkError,
  getGoalsServerDownError,
  getThreeGoalsHandler,
  getUserException,
  getUserNetworkError,
  getUserServerDownError,
} from '../../mocks/handlers';
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

  it('renders screen with user data and no goals', async () => {
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
    expect(screen.getByText(/hi/i)).toBeInTheDocument();
    expect(screen.getByText(/billie/i)).toBeInTheDocument();
    expect(screen.getByText('Set new goal')).toBeInTheDocument();
    expect(screen.getByText(/log out/i)).toBeInTheDocument();
  });

  it('renders screen with error messages: no goals and no user data', async () => {
    server.use(getUserException);
    server.use(getGoalsException);

    await act(async () => {
      renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
    });

    expect(screen.getByText('Test Error: User not found')).toBeInTheDocument();
    expect(screen.getByText('Test Error: Goals not found')).toBeInTheDocument();
  });

  it('renders screen with user data and goals error message', async () => {
    server.use(getGoalsException);

    await act(async () => {
      renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
    });

    expect(screen.getByText('Test Error: Goals not found')).toBeInTheDocument();
  });

  it('renders screen with no goals, no user data and server down error message', async () => {
    server.use(getUserServerDownError);
    server.use(getGoalsServerDownError);

    await act(async () => {
      renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
    });

    const error = /There are issues with the server. Please try again later/i;
    expect(screen.getAllByText(error)[0]).toBeInTheDocument();
    expect(screen.getAllByText(error)).toHaveLength(2);
  });

  it('renders screen with network error message', async () => {
    server.use(getUserNetworkError);
    server.use(getGoalsNetworkError);

    await act(async () => {
      renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
    });

    const error = /Test: some other network error/i;
    expect(screen.getAllByText(error)[0]).toBeInTheDocument();
    expect(screen.getAllByText(error)).toHaveLength(2);
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

    await userEvent.click(screen.getByText(/log out/i));
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

  it('displays three goals cards and info banner', async () => {
    server.use(getThreeGoalsHandler);

    await act(async () => {
      renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
    });

    const banner = screen.getByText(
      'You can add a maximum of three goals. Edit or replace your goals to fit your current needs.'
    );
    expect(banner).toBeInTheDocument();
    expect(screen.getAllByText(/show habits/i)).toHaveLength(3);
  });

  it('closes the info banner for user with three goals', async () => {
    server.use(getThreeGoalsHandler);

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

  it('displays the overlay with the goal form when "Add goal" button is clicked', async () => {
    await act(async () => {
      renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
    });

    expect(
      screen.queryByPlaceholderText(/Go S.M.A.R.T/i)
    ).not.toBeInTheDocument();

    const addGoalBtn = screen.getByText(/add goal/i);
    await userEvent.click(addGoalBtn);
    expect(screen.getByPlaceholderText(/Go S.M.A.R.T/i)).toBeInTheDocument();
  });
});

describe('On the Goals screen, a user can', () => {
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

  //add goals
  it('add a new goal', async () => {
    server.use(getEmptyGoalsHandler);
    let reRender;

    await act(async () => {
      const { rerender } = renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
      reRender = rerender;
    });

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

    expect(screen.getByText(/overview/i)).toBeInTheDocument();
    expect(screen.getByText('Add goal')).toBeInTheDocument();
    expect(screen.getByText(/show habits/i)).toBeInTheDocument();
    expect(screen.getByText(/billie/i)).toBeInTheDocument();
    expect(
      screen.getByText(mockGoalFormData.goalDefinition)
    ).toBeInTheDocument();
  });

  it('see an error message when goal could not be added', async () => {
    server.use(addGoalException);
    let reRender;

    await act(async () => {
      const { rerender } = renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });

      reRender = rerender;
    });

    await userEvent.click(screen.getByText('Add goal'));
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

    expect(
      screen.getByText('Test Error: Goal was not added')
    ).toBeInTheDocument();
  });

  it('see a network error message - on add goal', async () => {
    server.use(addGoalNetworkError);

    await act(async () => {
      renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
    });

    await userEvent.click(screen.getByText('Add goal'));

    await userEvent.type(
      screen.getByLabelText('Goal description'),
      mockGoalFormData.goalDefinition
    );
    await userEvent.type(
      screen.getByLabelText('Goal priority'),
      mockGoalFormData.priority
    );
    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'main' })
    );
    await userEvent.type(
      screen.getByLabelText('Start date'),
      mockGoalFormData.startDate
    );
    await userEvent.type(
      screen.getByLabelText('End date'),
      mockGoalFormData.endDate
    );
    await userEvent.click(screen.getByText('Set new goal'));

    expect(
      screen.getByText(/Test: some other network error/i)
    ).toBeInTheDocument();
  });

  it('see a server down error message - on add goal', async () => {
    server.use(addGoalServerDownError);

    await act(async () => {
      renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
    });

    await userEvent.click(screen.getByText('Add goal'));

    await userEvent.type(
      screen.getByLabelText('Goal description'),
      mockGoalFormData.goalDefinition
    );
    await userEvent.type(
      screen.getByLabelText('Goal priority'),
      mockGoalFormData.priority
    );
    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'main' })
    );
    await userEvent.type(
      screen.getByLabelText('Start date'),
      mockGoalFormData.startDate
    );
    await userEvent.type(
      screen.getByLabelText('End date'),
      mockGoalFormData.endDate
    );
    await userEvent.click(screen.getByText('Set new goal'));

    expect(
      screen.getByText(
        /There are issues with the server. Please try again later/i
      )
    ).toBeInTheDocument();
  });

  //delete goals
  it('delete one goal out of the three displayed', async () => {
    server.use(getThreeGoalsHandler);
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
  });

  it('see an error message when the goal could not be deleted', async () => {
    server.use(deleteGoalException);
    let reRender;

    await act(async () => {
      const { rerender } = renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
      reRender = rerender;
    });

    const deleteGoalButtons = screen.getAllByText(/delete/i);
    await userEvent.click(deleteGoalButtons[0]);

    await act(async () => {
      reRender(<Goals />, {
        route: '/goals',
      });
    });

    expect(
      screen.getByText('Test Error: Goal was not deleted')
    ).toBeInTheDocument();
  });

  it('see a server down error message - on delete goal', async () => {
    server.use(deleteGoalServerDownError);

    await act(async () => {
      renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
    });

    await userEvent.click(screen.getAllByText(/delete/i)[0]);
    expect(
      screen.getByText(
        /There are issues with the server. Please try again later/i
      )
    ).toBeInTheDocument();
  });

  it('see a network error message - on delete goal', async () => {
    server.use(deleteGoalNetworkError);

    await act(async () => {
      renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
    });

    await userEvent.click(screen.getAllByText(/delete/i)[0]);
    expect(
      screen.getByText(/Test: some other network error/i)
    ).toBeInTheDocument();
  });

  //edit goal
  it('edit the goal description of the first goal in the list', async () => {
    server.use(getThreeGoalsHandler);
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

  it('see an error message when the goal could not be edited', async () => {
    server.use(editGoalException);
    let reRender;

    await act(async () => {
      const { rerender } = renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
      reRender = rerender;
    });

    const editGoalButtons = screen.getAllByText('Edit');

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

    expect(
      screen.getByText('Test Error: Goal was not edited')
    ).toBeInTheDocument();
  });

  it('see a network error message - on edit goal', async () => {
    server.use(editGoalNetworkError);

    await act(async () => {
      renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
    });

    await userEvent.click(screen.getAllByText('Edit')[0]);
    await userEvent.type(
      screen.getByLabelText('Goal description'),
      editGoalData.goalDefinition
    );
    await userEvent.click(screen.getByText('Set new goal'));
    expect(
      screen.getByText(/Test: some other network error/i)
    ).toBeInTheDocument();
  });

  it('see a server down error message - on edit goal', async () => {
    server.use(editGoalServerDownError);

    await act(async () => {
      renderWithProvidersAndRouter(<Goals />, {
        route: '/goals',
      });
    });

    await userEvent.click(screen.getAllByText('Edit')[0]);
    await userEvent.type(
      screen.getByLabelText('Goal description'),
      editGoalData.goalDefinition
    );
    await userEvent.click(screen.getByText('Set new goal'));
    expect(
      screen.getByText(
        /There are issues with the server. Please try again later/i
      )
    ).toBeInTheDocument();
  });
});
