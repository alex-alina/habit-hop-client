import { updateHabits, removeHabit } from '../habits';

const goalId = 'bec49b7a-7819-453b-9895-347e3982acc5';
const habitId = 'b5e95781-9f45-4c38-8d67-21355fd5e449';

const state = {
  status: 'success',
  items: {
    'bec49b7a-7819-453b-9895-347e3982acc5': [
      {
        id: 'a4e95781-9f45-4c38-8d67-21355fd5e228',
        habitDescription: 'Run 2 km every evening',
        habitType: 'develop',
        progressMetric: 'km',
        goal: {
          id: 'bec49b7a-7819-453b-9895-347e3982acc5',
          goalDefinition:
            'Improve sleep quality by exercising and drinking less coffee',
          priority: 'tertiary',
          startDate: '2023-05-27',
          endDate: '2023-06-03',
        },
      },
      {
        id: 'b5e95781-9f45-4c38-8d67-21355fd5e449',
        habitDescription: 'Drink only one coffee per day',
        habitType: 'break',
        progressMetric: 'count',
        goal: {
          id: 'bec49b7a-7819-453b-9895-347e3982acc5',
          goalDefinition:
            'Improve sleep quality by exercising and drinking less coffee',
          priority: 'tertiary',
          startDate: '2023-05-27',
          endDate: '2023-06-03',
        },
      },
    ],
    'd74ece90-b6dc-4555-a4c9-f69e6bfa11fa': [
      {
        id: '5ce8a169-9e90-421f-af1a-c971e7bcabd4',
        habitDescription: 'Cook three times per week',
        habitType: 'develop',
        progressMetric: 'count',
        goal: {
          id: 'd74ece90-b6dc-4555-a4c9-f69e6bfa11fa',
          goalDefinition: 'Lorem ipsum pisicum capsicum vorum',
          priority: 'tertiary',
          startDate: '2023-05-27',
          endDate: '2023-06-10',
        },
      },
    ],
  },
  error: {},
  resStatus: 204,
};

const expectedResult = {
  'bec49b7a-7819-453b-9895-347e3982acc5': [
    {
      id: 'a4e95781-9f45-4c38-8d67-21355fd5e228',
      habitDescription: 'Run 2 km every evening',
      habitType: 'develop',
      progressMetric: 'km',
      goal: {
        id: 'bec49b7a-7819-453b-9895-347e3982acc5',
        goalDefinition:
          'Improve sleep quality by exercising and drinking less coffee',
        priority: 'tertiary',
        startDate: '2023-05-27',
        endDate: '2023-06-03',
      },
    },
  ],
  'd74ece90-b6dc-4555-a4c9-f69e6bfa11fa': [
    {
      id: '5ce8a169-9e90-421f-af1a-c971e7bcabd4',
      habitDescription: 'Cook three times per week',
      habitType: 'develop',
      progressMetric: 'count',
      goal: {
        id: 'd74ece90-b6dc-4555-a4c9-f69e6bfa11fa',
        goalDefinition: 'Lorem ipsum pisicum capsicum vorum',
        priority: 'tertiary',
        startDate: '2023-05-27',
        endDate: '2023-06-10',
      },
    },
  ],
};

const habitsWithInvalidGoalId = {
  '1fbbf71d-eb40-442d-95dc-59fa934baaa': [
    {
      id: 'aa750fa3-2643-4d84-b4b5-090162ae08b6',
      habitDescription: 'Stop using screens after 20.30',
      habitType: 'break',
      progressMetric: 'is-completed',
      goal: {
        id: '1fbbf71d-eb40-442d-95dc-59fa934baaa',
        goalDefinition:
          'I want to improve the quality of my sleep so that I can have more energy. g',
        priority: 'secondary',
        startDate: '2023-05-07',
        endDate: '2023-07-15',
      },
    },
  ],
  'e06a0741-5c2b-4e68-a632-29fa60955a4c': [
    {
      id: '6c7a726e-fb27-4671-9b95-0700c2328501',
      habitDescription: 'Walk one km every evening',
      habitType: 'develop',
      progressMetric: 'km',
      goal: {
        id: 'e06a0741-5c2b-4e68-a632-29fa60955a4c',
        goalDefinition:
          'Having an active lifestyle by riding my bike to work, walking every evening and running three times per week',
        priority: 'main',
        startDate: '2023-05-13',
        endDate: '2023-06-03',
      },
    },
  ],
};

const mockHabits = {
  '1fbbf71d-eb40-442d-95dc-59fa934b6834': [
    {
      id: 'aa750fa3-2643-4d84-b4b5-090162ae08b6',
      habitDescription: 'Stop using screens after 20.30',
      habitType: 'break',
      progressMetric: 'is-completed',
      goal: {
        id: '1fbbf71d-eb40-442d-95dc-59fa934b6834',
        goalDefinition:
          'I want to improve the quality of my sleep so that I can have more energy. g',
        priority: 'secondary',
        startDate: '2023-05-07',
        endDate: '2023-07-15',
      },
    },
    {
      id: 'cf826e63-c332-48d8-bd50-41d16329fc37',
      habitDescription: 'Do 10 min yoga practice every evening',
      habitType: 'develop',
      progressMetric: 'minutes',
      goal: {
        id: '1fbbf71d-eb40-442d-95dc-59fa934b6834',
        goalDefinition:
          'I want to improve the quality of my sleep so that I can have more energy. g',
        priority: 'secondary',
        startDate: '2023-05-07',
        endDate: '2023-07-15',
      },
    },
  ],
  'e06a0741-5c2b-4e68-a632-29fa60955a4c': [
    {
      id: '6c7a726e-fb27-4671-9b95-0700c2328501',
      habitDescription: 'Walk one km every evening',
      habitType: 'develop',
      progressMetric: 'km',
      goal: {
        id: 'e06a0741-5c2b-4e68-a632-29fa60955a4c',
        goalDefinition:
          'Having an active lifestyle by riding my bike to work, walking every evening and running three times per week',
        priority: 'main',
        startDate: '2023-05-13',
        endDate: '2023-06-03',
      },
    },
  ],
};

const mockHabit = {
  id: 'aa750fa3-2643-4d84-b4b5-090162ae098b',
  habitDescription: 'Meditate for 10 min every evening before sleep',
  habitType: 'develop',
  progressMetric: 'minutes',
  goal: {
    id: '1fbbf71d-eb40-442d-95dc-59fa934b6834',
    goalDefinition:
      'I want to improve the quality of my sleep so that I can have more energy. g',
    priority: 'secondary',
    startDate: '2023-05-07',
    endDate: '2023-07-15',
  },
};

const mockResult = {
  '1fbbf71d-eb40-442d-95dc-59fa934b6834': [
    {
      id: 'aa750fa3-2643-4d84-b4b5-090162ae08b6',
      habitDescription: 'Stop using screens after 20.30',
      habitType: 'break',
      progressMetric: 'is-completed',
      goal: {
        id: '1fbbf71d-eb40-442d-95dc-59fa934b6834',
        goalDefinition:
          'I want to improve the quality of my sleep so that I can have more energy. g',
        priority: 'secondary',
        startDate: '2023-05-07',
        endDate: '2023-07-15',
      },
    },
    {
      id: 'cf826e63-c332-48d8-bd50-41d16329fc37',
      habitDescription: 'Do 10 min yoga practice every evening',
      habitType: 'develop',
      progressMetric: 'minutes',
      goal: {
        id: '1fbbf71d-eb40-442d-95dc-59fa934b6834',
        goalDefinition:
          'I want to improve the quality of my sleep so that I can have more energy. g',
        priority: 'secondary',
        startDate: '2023-05-07',
        endDate: '2023-07-15',
      },
    },
    {
      id: 'aa750fa3-2643-4d84-b4b5-090162ae098b',
      habitDescription: 'Meditate for 10 min every evening before sleep',
      habitType: 'develop',
      progressMetric: 'minutes',
      goal: {
        id: '1fbbf71d-eb40-442d-95dc-59fa934b6834',
        goalDefinition:
          'I want to improve the quality of my sleep so that I can have more energy. g',
        priority: 'secondary',
        startDate: '2023-05-07',
        endDate: '2023-07-15',
      },
    },
  ],
  'e06a0741-5c2b-4e68-a632-29fa60955a4c': [
    {
      id: '6c7a726e-fb27-4671-9b95-0700c2328501',
      habitDescription: 'Walk one km every evening',
      habitType: 'develop',
      progressMetric: 'km',
      goal: {
        id: 'e06a0741-5c2b-4e68-a632-29fa60955a4c',
        goalDefinition:
          'Having an active lifestyle by riding my bike to work, walking every evening and running three times per week',
        priority: 'main',
        startDate: '2023-05-13',
        endDate: '2023-06-03',
      },
    },
  ],
};

it('adds new habit to the list corresponding to the matching goal', () => {
  expect(updateHabits(mockHabits, mockHabit)).toEqual(mockResult);
});

it('throws error if habits is an empty object', () => {
  expect(() => updateHabits({}, mockHabit)).toThrow(
    'There are no goals connected with this habit'
  );
});

it('throws error if there is no matching goal', () => {
  expect(() => updateHabits(habitsWithInvalidGoalId, mockHabit)).toThrow(
    'There are no goals connected with this habit'
  );
});

it('removes deleted habit from state', () => {
  expect(removeHabit(state, goalId, habitId)).toEqual(expectedResult);
});
