import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import GoalCard from '../GoalCard/GoalCard';

const editClickHandler = jest.fn();
const deleteClickHandler = jest.fn();
const handleHabitFormOverlay = jest.fn();
const handleGetHabits = jest.fn();

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
  hideHabitsBtn: 'Hide Habits',
  habitsContainer: {
    goToOverviewBtn: 'Habits overview',
    developSection: {
      title: 'I will',
      iconName: '',
      newEntryBtn: 'New entry',
    },
    breakSection: {
      title: "I won't",
      iconName: '',
      newEntryBtn: 'New entry',
    },
  },
};

describe('GoalCard', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders GoalCard with content', async () => {
    renderWithProvidersAndRouter(
      <GoalCard
        goal={mockGoalData}
        goalCardText={mockGoalText}
        handleDelete={editClickHandler}
        handleEdit={deleteClickHandler}
        handleHabitFormOverlay={handleHabitFormOverlay}
        handleGetHabits={handleGetHabits}
      />
    );
    const titles = screen.getAllByRole('heading', { level: 3 });
    const priorityTitle = titles[0];
    const timeSectionTitle = titles[1];
    const startDateLabel = screen.getByText(
      mockGoalText.timeSection.startLabel
    );

    expect(screen.getByText(mockGoalText.editBtn)).toBeInTheDocument();
    expect(screen.getByText(mockGoalText.deleteBtn)).toBeInTheDocument();
    expect(screen.getByText(mockGoalData.endDate)).toBeInTheDocument();
    expect(startDateLabel).toBeInTheDocument();
    expect(priorityTitle).toHaveTextContent(/main goal/i);
    expect(timeSectionTitle).toHaveTextContent(mockGoalText.timeSection.title);
    expect(screen.getByText(mockGoalText.showHabitsBtn)).toHaveTextContent(
      'Show Habits'
    );

    await userEvent.click(screen.getByText(mockGoalText.showHabitsBtn));
    expect(screen.getByText(mockGoalText.hideHabitsBtn)).toBeInTheDocument();
  });

  it('should call handlers when the edit and delete buttons are clicked', async () => {
    renderWithProvidersAndRouter(
      <GoalCard
        goal={mockGoalData}
        goalCardText={mockGoalText}
        handleDelete={editClickHandler}
        handleEdit={deleteClickHandler}
        handleHabitFormOverlay={handleHabitFormOverlay}
        handleGetHabits={handleGetHabits}
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
