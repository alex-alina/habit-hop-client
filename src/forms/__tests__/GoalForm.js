import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import GoalForm from '../GoalForm';

const content = {
  goalDescription: {
    label: 'Goal description',
    placeholder: 'Go S.M.A.R.T',
  },
  startdateInput: {
    label: 'Start date',
    placeholder: 'YYY-MM-DD',
  },
  endDateInput: {
    label: 'End date',
    placeholder: 'YYY-MM-DD',
  },
  select: {
    label: 'Goal priority',
    placeholder: 'Choose priority',
  },
  button: 'Set new goal',
};

const formData = {
  goalDefinition:
    'Train for a tripple marathon by running every day for 15km and going to the gym twice per week',
  priority: 'main',
  startDate: '2023-03-23',
  endDate: '2023-06-16',
};

const invalidFormData = {
  goalDefinition: 'Bake cupcakes ',
  priority: '',
  startDate: '2023-03-23',
  endDate: '',
};

describe('GoalForm component', () => {
  const handleSubmit = jest.fn();
  const handleCloseOverlay = jest.fn();
  const { goalDescription, startdateInput, endDateInput, button } = content;

  it('renders the form, submits the values and closes the form overlay on successful submit', async () => {
    renderWithProvidersAndRouter(
      <GoalForm
        content={content}
        handleSubmit={handleSubmit}
        handleCloseOverlay={handleCloseOverlay}
      />,
      {
        route: '/goals',
      }
    );

    const user = userEvent.setup();
    const goal = screen.getByLabelText(goalDescription.label);
    const start = screen.getByLabelText(startdateInput.label);
    const end = screen.getByLabelText(endDateInput.label);
    const submitButton = screen.getByText(button);

    await user.type(goal, formData.goalDefinition);
    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'main' })
    );
    await user.type(start, formData.startDate);
    await user.type(end, formData.endDate);
    await user.click(submitButton);

    expect(screen.getByRole('option', { name: 'main' }).selected).toBe(true);

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith(formData));
    expect(handleCloseOverlay).toHaveBeenCalledTimes(1);
  });

  it('displays form error messages and does not submit invalid form values', async () => {
    renderWithProvidersAndRouter(
      <GoalForm content={content} handleSubmit={handleSubmit} />,
      {
        route: '/goals',
      }
    );
    const user = userEvent.setup();
    const goal = screen.getByLabelText(goalDescription.label);
    const start = screen.getByLabelText(startdateInput.label);
    const submitButton = screen.getByText(button);

    await user.type(goal, invalidFormData.goalDefinition);
    await user.type(start, invalidFormData.startDate);
    await user.click(submitButton);

    expect(screen.getAllByText('Required')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Required')).toHaveLength(2);
    expect(
      screen.getByText('Goal description must have at least 20 characters')
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(handleSubmit).not.toHaveBeenCalledWith(invalidFormData)
    );
  });
});
