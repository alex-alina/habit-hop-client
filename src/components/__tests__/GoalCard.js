import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../utils/testUtils';
import GoalCard from '../GoalCard';

const editClickHandler = jest.fn();
const deleteClickHandler = jest.fn();

const mockGoalData = {
  goalDefinition: 'become a baker',
  priority: 'main',
  startDate: '2023-04-23',
  endDate: '2023-09-14',
};

const mockGoalText = {
  editBtn: 'Edit',
  deleteBtn: 'Delete',
  timeSection: {
    title: 'Timeframe',
    startLabel: 'Starts on:',
    endLabel: 'Ends on:',
  },
  showHabitsBtn: 'Show Habits',
};

describe('GoalCard', () => {
  it('renders GoalCard with content', () => {
    renderWithTheme(
      <GoalCard
        goal={mockGoalData}
        goalCardText={mockGoalText}
        handleDelete={editClickHandler}
        handleEdit={deleteClickHandler}
      />
    );

    const priorityTitle = screen.getByRole('heading', { level: 3 });
    const timeSectionTitle = screen.getByRole('heading', { level: 4 });
    const startDateLabel = screen.getByText(
      mockGoalText.timeSection.startLabel
    );

    expect(screen.getByText(mockGoalText.editBtn)).toBeInTheDocument();
    expect(screen.getByText(mockGoalText.deleteBtn)).toBeInTheDocument();
    expect(screen.getByText(mockGoalData.endDate)).toBeInTheDocument();
    expect(startDateLabel).toBeInTheDocument();
    expect(priorityTitle).toHaveTextContent(/main goal/i);
    expect(timeSectionTitle).toHaveTextContent(mockGoalText.timeSection.title);
    expect(screen.getByText(mockGoalText.showHabitsBtn)).toHaveStyle(
      'max-width: 150px'
    );
  });

  it('should call handlers when the edit and delete buttons are clicked', async () => {
    renderWithTheme(
      <GoalCard
        goal={mockGoalData}
        goalCardText={mockGoalText}
        handleDelete={editClickHandler}
        handleEdit={deleteClickHandler}
      />
    );

    const editBtn = screen.getByText(mockGoalText.editBtn);
    const deleteBtn = screen.getByText(mockGoalText.deleteBtn);

    await userEvent.click(editBtn);
    await userEvent.click(deleteBtn);

    expect(editClickHandler).toHaveBeenCalled();
    expect(editClickHandler).toHaveBeenCalledTimes(1);
    expect(deleteClickHandler).toHaveBeenCalled();
    expect(deleteClickHandler).toHaveBeenCalledTimes(1);
  });
});