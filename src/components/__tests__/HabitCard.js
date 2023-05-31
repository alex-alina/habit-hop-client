import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import HabitCard from '../HabitCard/HabitCard';

const mockContent = {
  settingsBtn: 'Settings',
  editBtn: 'Edit',
  deleteBtn: 'Delete',
  newEntryBtn: 'New Entry',
  showEntriesBtn: 'Show entries',
  hideEntriesBtn: 'Hide entries',
  developIcon: 'check-one',
  breakIcon: 'close-one',
};

const mockDevelopHabit = {
  id: '31e8cea9-4434-4b3b-9819-a36ae16b80eb',
  habitDescription: 'Run every evening for 10 minutes',
  habitType: 'develop',
  progressMetric: 'minutes',
};

const mockBreakHabit = {
  id: '31e8cea9-4434-4b3b-9819-a36ae16b80eb',
  habitDescription: 'Stop adding sugar to coffee',
  habitType: 'break',
  progressMetric: 'count',
};

describe('HabitCard', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders with content and develop habit', async () => {
    renderWithProvidersAndRouter(
      <HabitCard content={mockContent} habit={mockDevelopHabit} />
    );

    expect(screen.getByText(/new entry/i)).toBeInTheDocument();
    expect(screen.getByText(/show entries/i)).toBeInTheDocument();
    expect(screen.queryByText(/delete/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/Run every evening for 10 minutes/i)
    ).toBeInTheDocument();

    await userEvent.click(screen.getByText(/settings/i));
    expect(screen.getByText(/delete/i)).toBeInTheDocument();
    await userEvent.click(screen.getByText(/show entries/i));
    expect(screen.getByText(/hide entries/i)).toBeInTheDocument();
  });

  it('renders with content and break habit', async () => {
    renderWithProvidersAndRouter(
      <HabitCard content={mockContent} habit={mockBreakHabit} />
    );

    expect(screen.getByText(/new entry/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Stop adding sugar to coffee/i)
    ).toBeInTheDocument();

    await userEvent.click(screen.getByText(/settings/i));
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
  });
});
