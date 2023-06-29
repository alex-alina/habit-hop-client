import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import HabitForm from '../HabitForm';

const content = {
  habitDescription: {
    label: 'Habit description',
    placeholder: 'Go S.M.A.R.T',
  },
  habitTypeInput: {
    legend: 'Habit type',
    radios: [
      { label: 'develop new habit', value: 'develop' },
      { label: 'break old habit', value: 'break' },
    ],
  },
  progressMetricSection: {
    title: 'Progress metric (select one)',
    radioGroups: [
      {
        legend: 'Distance:',
        radios: [
          { label: 'm', value: 'meter' },
          { label: 'km', value: 'km' },
        ],
      },
      {
        legend: 'Duration:',
        radios: [
          { label: 'minutes', value: 'minutes' },
          { label: 'hours', value: 'hours' },
          { label: 'days', value: 'days' },
        ],
      },
      {
        legend: 'Quantity:',
        radios: [{ label: 'unit count', value: 'count' }],
      },
    ],
  },
  button: 'Add new habit',
  editButton: 'Update habit',
  editInfo: 'Only the habit description cand be edited.',
};

const mockGoalId = 'e06a0741-5c2b-4e68-a632-29fa60955a4c';

const formData = {
  habitDescription: 'Exercise daily',
  habitType: 'develop',
  progressMetric: 'minutes',
};

const invalidFormData = {
  habitDescription: 'Exercise daily',
  habitType: '',
  progressMetric: '',
};

const habitMockData = {
  id: '31e8cea9-4434-4b3b-9819-a36ae16b80eb',
  habitDescription: 'Eat more fruit',
  habitType: 'develop',
  progressMetric: 'count',
  goal: {
    id: 'e06a0741-5c2b-4e68-a632-29fa60955a4c',
    goalDefinition:
      'Having an active lifestyle by riding my bike to work, walking every evening and running three times per week',
    priority: 'main',
    startDate: '2023-05-13',
    endDate: '2023-06-03',
  },
};

const editedHabitFormData = {
  habitDescription: 'Exercise daily',
  habitType: 'develop',
  progressMetric: 'count',
};

describe('Habit Form component', () => {
  const handleSubmit = jest.fn();
  const handleCloseOverlay = jest.fn();

  it('renders the form, submits the values and closes the form overlay on successful submit', async () => {
    renderWithProvidersAndRouter(
      <HabitForm
        content={content}
        handleSubmit={handleSubmit}
        handleCloseOverlay={handleCloseOverlay}
        goalId={mockGoalId}
      />,
      {
        route: '/habits',
      }
    );

    const user = userEvent.setup();
    const habit = screen.getByLabelText('Habit description');
    const type = screen.getByLabelText('develop new habit');
    const metric = screen.getByLabelText('minutes');
    const submitButton = screen.getByText('Add new habit');
    expect(submitButton).toBeInTheDocument();
    expect(type).not.toBeChecked();
    await user.type(habit, formData.habitDescription);
    await user.click(type, formData.habitType);
    await user.click(metric, formData.progressMetric);

    expect(habit).toHaveValue('Exercise daily');
    expect(type).toBeChecked();
    expect(metric).toBeChecked();
    await user.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(formData, mockGoalId)
    );
    expect(handleCloseOverlay).toHaveBeenCalledTimes(1);
  });

  it('displays form error messages and does not submit invalid form values', async () => {
    const handleSubmit = jest.fn();
    const handleCloseOverlay = jest.fn();
    renderWithProvidersAndRouter(
      <HabitForm
        content={content}
        handleSubmit={handleSubmit}
        handleCloseOverlay={handleCloseOverlay}
        goalId={mockGoalId}
      />,
      {
        route: '/goals',
      }
    );

    const user = userEvent.setup();
    const habit = screen.getByLabelText('Habit description');
    const type = screen.getByLabelText('develop new habit');
    const metric = screen.getByLabelText('minutes');
    const submitButton = screen.getByText('Add new habit');

    await user.type(habit, formData.habitDescription);
    expect(habit).toHaveValue('Exercise daily');
    expect(type).not.toBeChecked();
    expect(metric).not.toBeChecked();
    await user.click(submitButton);

    expect(screen.getAllByText('Required')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Required')).toHaveLength(2);
    await waitFor(() =>
      expect(handleSubmit).not.toHaveBeenCalledWith(invalidFormData, mockGoalId)
    );
    expect(handleSubmit).toHaveBeenCalledTimes(0);
    expect(handleCloseOverlay).not.toHaveBeenCalledTimes(1);
  });
});

describe('On Edit mode the Habit Form component', () => {
  const handleSubmit = jest.fn();
  const handleCloseOverlay = jest.fn();

  it('renders the form with prefilled values', async () => {
    renderWithProvidersAndRouter(
      <HabitForm
        content={content}
        handleSubmit={handleSubmit}
        handleCloseOverlay={handleCloseOverlay}
        goalId={mockGoalId}
        habit={habitMockData}
      />,
      {
        route: '/habits',
      }
    );

    const habit = screen.getByLabelText('Habit description');
    const type = screen.getByLabelText('develop new habit');
    expect(habit).toHaveValue('Eat more fruit');
    expect(type).toBeChecked();
    expect(
      screen.getByText('Only the habit description cand be edited.')
    ).toBeInTheDocument();
  });

  it('renders the prefilled form; submits the edited values and closes overlay on successful submit', async () => {
    renderWithProvidersAndRouter(
      <HabitForm
        content={content}
        handleSubmit={handleSubmit}
        handleCloseOverlay={handleCloseOverlay}
        goalId={mockGoalId}
        habit={habitMockData}
      />,
      {
        route: '/habits',
      }
    );

    const user = userEvent.setup();
    const habit = screen.getByLabelText('Habit description');
    const submitButton = screen.getByText(/update habit/i);
    expect(submitButton).toBeInTheDocument();
    expect(habit).toHaveValue('Eat more fruit');
    await user.clear(habit);
    await user.type(habit, 'Exercise daily');
    expect(habit).toHaveValue('Exercise daily');
    await user.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        editedHabitFormData,
        '31e8cea9-4434-4b3b-9819-a36ae16b80eb',
        mockGoalId
      )
    );
    expect(handleCloseOverlay).toHaveBeenCalledTimes(1);
  });
});
