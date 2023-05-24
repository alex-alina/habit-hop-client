import { screen } from '@testing-library/react';
import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import HabitsSection from '../GoalCard/HabitsSection';

const mockContent = {
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
};

const mockHabits = [
  {
    id: '31e8cea9-4434-4b3b-9819-a36ae16b80eb',
    habitDescription: 'Run every evening for 10 minutes',
    habitType: 'develop',
    progressMetric: 'minutes',
    goal: {
      id: 'e06a0741-5c2b-4e68-a632-29fa60955a4c',
      goalDefinition:
        'Having an active lifestyle by riding my bike to work, walking every evening and running three times per week',
      priority: 'main',
      startDate: '2023-05-13',
      endDate: '2023-06-03',
    },
  },
  {
    id: 'e50f0a4e-414f-4b2b-88d0-b527232f6f1e',
    habitDescription: 'Stop drinking tea with sugar in it',
    habitType: 'break',
    progressMetric: 'count',
    goal: {
      id: 'e06a0741-5c2b-4e68-a632-29fa60955a4c',
      goalDefinition:
        'Having an active lifestyle by riding my bike to work, walking every evening and running three times per week',
      priority: 'main',
      startDate: '2023-05-13',
      endDate: '2023-06-03',
    },
  },
];

const mockDevelopHabits = [mockHabits[0]];
const mockBreakpHabits = [mockHabits[1]];

describe('HabitSection component', () => {
  it('renders with develop habits list and break habits list', () => {
    renderWithProvidersAndRouter(
      <HabitsSection content={mockContent} habits={mockHabits} />
    );

    expect(
      screen.getAllByRole('graphics-symbol', { hidden: true })
    ).toHaveLength(2);
    expect(
      screen.getByText(/Run every evening for 10 minutes/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Stop drinking tea with sugar in it/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/I won't/i)).toBeInTheDocument();
    expect(screen.getByText(/I will/i)).toBeInTheDocument();
  });

  it('renders only develop habits list', () => {
    renderWithProvidersAndRouter(
      <HabitsSection content={mockContent} habits={mockDevelopHabits} />
    );

    expect(
      screen.getByRole('graphics-symbol', { hidden: true })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Run every evening for 10 minutes/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/I won't/i)).not.toBeInTheDocument();
    expect(screen.getByText(/I will/i)).toBeInTheDocument();
  });

  it('renders only break habits list', () => {
    renderWithProvidersAndRouter(
      <HabitsSection content={mockContent} habits={mockBreakpHabits} />
    );

    expect(
      screen.getByRole('graphics-symbol', { hidden: true })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Stop drinking tea with sugar in it/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/I won't/i)).toBeInTheDocument();
    expect(screen.queryByText(/I will/i)).not.toBeInTheDocument();
  });

  it('renders empty container', () => {
    renderWithProvidersAndRouter(
      <HabitsSection
        content={mockContent}
        habits={[]}
        data-testid="empty-section"
      />
    );

    expect(screen.getByTestId('empty-section')).toBeInTheDocument();
    expect(screen.getByTestId('empty-section')).toHaveStyle(
      'border-top: 2px solid'
    );
  });
});
