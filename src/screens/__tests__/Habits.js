import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Router from 'react-router';
import { mockHabitFormData, mockJwt } from '../../mocks/constants';
import {
  deleteHabitException,
  deleteHabitNetworkError,
  deleteHabitServerDownError,
  getGoalException,
  getGoalNetworkError,
  getGoalServerDownError,
  getHabitsException,
  getHabitsNetworkError,
  getHabitsServerDownError,
  getUserException,
  getUserNetworkError,
  getUserServerDownError,
  getZeroHabitsHandler,
  getFourHabitsHandler,
} from '../../mocks/handlers';
import { server } from '../../mocks/server';
import * as jwtModule from '../../utils/jwt';
import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import Habits from '../Habits';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
}));

//this mock goal starts with two habits (one develop and one break)
const goalId = 'bec49b7a-7819-453b-9895-347e3982acc5';

describe('Habits component', () => {
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

  it('renders screen with goal listed in the side bar, and two habit cards', async () => {
    let goalsContainer;
    jest.spyOn(Router, 'useParams').mockReturnValue({ goalId });

    await act(async () => {
      const { container } = renderWithProvidersAndRouter(<Habits />, {
        route: `/habits/${goalId}`,
      });
      goalsContainer = container;
    });

    const habitCards = screen.getAllByText(/settings/i);
    const goalText = screen.getByText(
      /improve sleep quality by exercising and drinking less coffee/i
    );

    expect(goalsContainer).toBeInTheDocument();
    expect(goalsContainer.innerHTML).toMatchSnapshot();
    expect(habitCards).toHaveLength(2);
    expect(goalText).toBeInTheDocument();
  });

  it('allows a user with no habits to open the add habit form overlay', async () => {
    server.use(getZeroHabitsHandler);
    jest.spyOn(Router, 'useParams').mockReturnValue({ goalId });
    let reRender;

    await act(async () => {
      const { rerender } = renderWithProvidersAndRouter(<Habits />, {
        route: `/habits/${goalId}`,
      });
      reRender = rerender;
    });

    const user = userEvent.setup();
    const noHabitsIntro = screen.getByText(
      'Oops, you have no habits for this goal...'
    );

    expect(noHabitsIntro).toBeInTheDocument();
    expect(screen.queryByText('Habit description')).not.toBeInTheDocument();

    await user.click(screen.getByText(/add habit/i));
    expect(screen.getByLabelText('Habit description')).toBeInTheDocument();
    expect(screen.getByText('Add new habit')).toBeInTheDocument();

    const closeBtn = screen.getByLabelText('Close overlay');
    await userEvent.click(closeBtn);

    await act(async () => {
      reRender(<Habits />, {
        route: `/habits/${goalId}`,
      });
    });

    expect(
      screen.queryByLabelText('Habit description')
    ).not.toBeInTheDocument();
  });

  it('allows the user to open and close the habit form overlay', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ goalId });
    let reRender;

    await act(async () => {
      const { rerender } = renderWithProvidersAndRouter(<Habits />, {
        route: `/habits/${goalId}`,
      });
      reRender = rerender;
    });

    const user = userEvent.setup();
    const formTextInput = screen.queryByLabelText('Habit description');
    expect(formTextInput).not.toBeInTheDocument();

    await user.click(screen.getByText(/add habit/i));
    expect(screen.getByLabelText('Habit description')).toBeInTheDocument();
    expect(screen.getByText('Add new habit')).toBeInTheDocument();

    const closeBtn = screen.getByLabelText('Close overlay');
    await userEvent.click(closeBtn);

    await act(async () => {
      reRender(<Habits />, {
        route: `/habits/${goalId}`,
      });
    });

    expect(formTextInput).not.toBeInTheDocument();
  });

  it('allows the user to add a new habit if they have less than four habits', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ goalId });
    let reRender;

    await act(async () => {
      const { rerender } = renderWithProvidersAndRouter(<Habits />, {
        route: `/habits/${goalId}`,
      });
      reRender = rerender;
    });

    const user = userEvent.setup();
    const habitCards = screen.getAllByText(/settings/i);
    expect(habitCards).toHaveLength(2);

    await user.click(screen.getByText(/add habit/i));

    await user.type(
      screen.getByLabelText('Habit description'),
      mockHabitFormData.habitDescription
    );
    await user.click(
      screen.getByLabelText('develop new habit'),
      mockHabitFormData.habitType
    );
    await user.click(
      screen.getByLabelText('minutes'),
      mockHabitFormData.progressMetric
    );
    await user.click(screen.getByText('Add new habit'));

    await act(async () => {
      reRender(<Habits />, {
        route: `/habits/${goalId}`,
      });
    });
    const habitOneText = screen.getByText(/run 2 km every evening/i);
    const habitTwoText = screen.getByText(/drink only one coffee per day/i);
    const habitThreeText = screen.getByText(mockHabitFormData.habitDescription);
    expect(screen.getAllByText(/settings/i)).toHaveLength(3);
    expect(habitOneText).toBeInTheDocument();
    expect(habitTwoText).toBeInTheDocument();
    expect(habitThreeText).toBeInTheDocument();
  });

  it('allows the user to delete a habit from the list', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ goalId });

    await act(async () => {
      renderWithProvidersAndRouter(<Habits />, {
        route: `/habits/${goalId}`,
      });
    });

    const user = userEvent.setup();
    const habitCards = screen.getAllByText(/settings/i);
    expect(habitCards).toHaveLength(2);
    expect(screen.queryByText(/delete/i)).not.toBeInTheDocument();

    const firstSettingsBtn = habitCards[0];
    await user.click(firstSettingsBtn);
    expect(screen.getByText(/delete/i)).toBeInTheDocument();

    await user.click(screen.getByText(/delete/i));
    expect(screen.getAllByText(/settings/i)).toHaveLength(1);
  });

  it('allows user to log out and redirects to /login', async () => {
    let spy;
    spy = jest.spyOn(jwtModule, 'isExpired');
    spy.mockReturnValue(false);
    jest.spyOn(Router, 'useParams').mockReturnValue({ goalId });

    await act(async () => {
      renderWithProvidersAndRouter(<Habits />, {
        route: `/habits/${goalId}`,
      });
    });

    expect(spy).toHaveBeenCalled();
    expect(window.location.pathname).toBe(`/habits/${goalId}`);
    const logOutBtns = screen.getAllByText(/log out/i);
    await userEvent.click(logOutBtns[0]);
    expect(window.location.pathname).toBe('/login');
  });

  it('logs out user and redirects to /login - second button', async () => {
    let spy;
    spy = jest.spyOn(jwtModule, 'isExpired');
    spy.mockReturnValue(false);
    jest.spyOn(Router, 'useParams').mockReturnValue({ goalId });

    await act(async () => {
      renderWithProvidersAndRouter(<Habits />, {
        route: `/habits/${goalId}`,
      });
    });

    expect(spy).toHaveBeenCalled();
    expect(window.location.pathname).toBe(`/habits/${goalId}`);
    const logOutBtns = screen.getAllByText(/log out/i);
    await userEvent.click(logOutBtns[1]);
    expect(window.location.pathname).toBe('/login');
  });

  it('logs out user and redirects to /login when token is expired', async () => {
    let spy;
    spy = jest.spyOn(jwtModule, 'isExpired');
    spy.mockReturnValue(true);
    jest.spyOn(Router, 'useParams').mockReturnValue({ goalId });

    await act(async () => {
      renderWithProvidersAndRouter(<Habits />, {
        route: `/habits/${goalId}`,
      });
    });

    expect(spy).toHaveBeenCalled();
    expect(window.location.pathname).not.toBe(`/habits/${goalId}`);
    expect(window.location.pathname).toBe('/login');
  });

  it('displays four habit cards and info banner', async () => {
    server.use(getFourHabitsHandler);
    jest.spyOn(Router, 'useParams').mockReturnValue({ goalId });

    await act(async () => {
      renderWithProvidersAndRouter(<Habits />, {
        route: `/habits/${goalId}`,
      });
    });

    const banner = screen.getByText(
      /You can add a maximum of four habits per goal/i
    );
    expect(banner).toBeInTheDocument();
    expect(screen.getAllByText(/settings/i)).toHaveLength(4);
  });

  it('closes the info banner for user with three goals', async () => {
    server.use(getFourHabitsHandler);
    jest.spyOn(Router, 'useParams').mockReturnValue({ goalId });

    await act(async () => {
      renderWithProvidersAndRouter(<Habits />, {
        route: `/habits/${goalId}`,
      });
    });

    const banner = screen.getByText(
      /You can add a maximum of four habits per goal/i
    );

    expect(banner).toBeInTheDocument();
    await userEvent.click(
      screen.getByRole('button', { name: /close banner/i })
    );

    expect(banner).not.toBeInTheDocument();
  });
});

describe('Habits component (errors)', () => {
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

  it('renders screen with error messages: no goals, user or habits data', async () => {
    server.use(getUserException);
    server.use(getGoalException);
    server.use(getHabitsException);
    jest.spyOn(Router, 'useParams').mockReturnValue({ goalId });

    await act(async () => {
      renderWithProvidersAndRouter(<Habits />, {
        route: `/habits/${goalId}`,
      });
    });
    expect(screen.getByText('Test Error: User not found')).toBeInTheDocument();
    expect(screen.getByText('Test Error: Goal not found')).toBeInTheDocument();
    expect(
      screen.getByText('Test Error: Habits not found')
    ).toBeInTheDocument();
  });

  it('renders screen with server down error message', async () => {
    server.use(getUserServerDownError);
    server.use(getGoalServerDownError);
    server.use(getHabitsServerDownError);
    jest.spyOn(Router, 'useParams').mockReturnValue({ goalId });

    await act(async () => {
      renderWithProvidersAndRouter(<Habits />, {
        route: `/habits/${goalId}`,
      });
    });

    const error = /There are issues with the server. Please try again later/i;
    expect(screen.getAllByText(error)[0]).toBeInTheDocument();
    expect(screen.getAllByText(error)).toHaveLength(3);
  });

  it('renders screen with network error message', async () => {
    server.use(getUserNetworkError);
    server.use(getGoalNetworkError);
    server.use(getHabitsNetworkError);
    jest.spyOn(Router, 'useParams').mockReturnValue({ goalId });

    await act(async () => {
      renderWithProvidersAndRouter(<Habits />, {
        route: `/habits/${goalId}`,
      });
    });

    const error = /Test: some other network error/i;
    expect(screen.getAllByText(error)[0]).toBeInTheDocument();
    expect(screen.getAllByText(error)).toHaveLength(3);
  });

  it('renders server error when habit could not be deleted', async () => {
    server.use(deleteHabitException);
    jest.spyOn(Router, 'useParams').mockReturnValue({ goalId });

    await act(async () => {
      renderWithProvidersAndRouter(<Habits />, {
        route: `/habits/${goalId}`,
      });
    });

    const user = userEvent.setup();
    const habitCards = screen.getAllByText(/settings/i);
    expect(habitCards).toHaveLength(2);

    const firstSettingsBtn = habitCards[0];
    await user.click(firstSettingsBtn);
    await user.click(screen.getByText(/delete/i));
    expect(screen.getAllByText(/settings/i)).toHaveLength(2);
    expect(
      screen.getByText('Test Error: Habit was not deleted')
    ).toBeInTheDocument();
  });

  it('renders server down error message when user tries to delete habit', async () => {
    server.use(deleteHabitServerDownError);
    jest.spyOn(Router, 'useParams').mockReturnValue({ goalId });

    await act(async () => {
      renderWithProvidersAndRouter(<Habits />, {
        route: `/habits/${goalId}`,
      });
    });

    const user = userEvent.setup();
    const error = /There are issues with the server. Please try again later/i;
    const habitCards = screen.getAllByText(/settings/i);
    const firstSettingsBtn = habitCards[0];
    await user.click(firstSettingsBtn);
    await user.click(screen.getByText(/delete/i));
    expect(screen.getAllByText(/settings/i)).toHaveLength(2);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('renders network error message when user tries to delete habit', async () => {
    server.use(deleteHabitNetworkError);
    jest.spyOn(Router, 'useParams').mockReturnValue({ goalId });

    await act(async () => {
      renderWithProvidersAndRouter(<Habits />, {
        route: `/habits/${goalId}`,
      });
    });

    const user = userEvent.setup();
    const error = /Test: some other network error/i;
    const habitCards = screen.getAllByText(/settings/i);
    const firstSettingsBtn = habitCards[0];
    await user.click(firstSettingsBtn);
    await user.click(screen.getByText(/delete/i));
    expect(screen.getAllByText(/settings/i)).toHaveLength(2);
    expect(screen.getByText(error)).toBeInTheDocument();
  });
});
