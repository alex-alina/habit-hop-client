import GoalCard from '../GoalCard';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../utils/testUtils';

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

    const editBtn = screen.getByText(mockGoalText.editBtn);
    const deleteBtn = screen.getByText(mockGoalText.deleteBtn);
    const priority = screen.getByRole('heading', { level: 3 });
    const timeSectionTitle = screen.getByRole('heading', { level: 4 });
    const showHabitsBtn = screen.getByText(mockGoalText.showHabitsBtn);
    const startDateLabel = screen.getByText(
      mockGoalText.timeSection.startLabel
    );
    const endDate = screen.getByText(mockGoalData.endDate);

    expect(editBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    expect(priority).toHaveTextContent(/main goal/i);
    expect(timeSectionTitle).toHaveTextContent(mockGoalText.timeSection.title);
    expect(startDateLabel).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
    expect(showHabitsBtn).toHaveStyle('max-width: 150px');
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
