const storageJwtKey = 'jwt';
const mockJwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRjM2MxMWJmLTU4NGMtNDA5MC1hYThiLTM5ZTQzY2ZhZmNhYiIsImlhdCI6MTY4MTQyMDcwMCwiZXhwIjoxNjgxNDI3OTAwfQ.sYclsZo_DO9zZ2375Kg-AiGZpiVvox1NojPK3eGj9k4';
const mockUserData = {
  createdAt: '2023-04-25T19:08:15.956Z',
  id: 'dc3c11bf-584c-4090-aa8b-39e43cfafcab',
  email: 'test@example.com',
  firstName: 'Billie',
  lastName: 'Test',
  lastLogin: '2023-04-25T19:08:15.956Z',
};

const mockGoalFormData = {
  goalDefinition:
    'Improve sleep quality by exercising and drinking less coffee',
  priority: 'main',
  startDate: '2023-03-23',
  endDate: '2023-06-16',
};

const mockGoalData1 = {
  endDate: '2023-05-06',
  goalDefinition:
    'Improve sleep quality by exercising and drinking less coffee',
  id: 'bec49b7a-7819-453b-9895-347e3982acc5',
  priority: 'main',
  startDate: '2023-04-08',
};

const mockGoalData2 = {
  endDate: '2023-05-06',
  goalDefinition:
    'I want to learn how to play guitar, and be able to play 3 songs by the end of the year',
  id: '44d96277-99ea-4a83-ab80-deed9148ddc1',
  priority: 'main',
  startDate: '2023-04-08',
};

const mockGoalData3 = {
  endDate: '2023-05-06',
  goalDefinition:
    'I want to learn how to bake muffins, cupcakes and birthday cakes by baking every weekend for six months',
  id: '1c8a4a14-7fed-4a91-b48b-a9290677043d',
  priority: 'main',
  startDate: '2023-04-08',
};

const editGoalData = {
  endDate: '2023-05-06',
  goalDefinition:
    'Train for a tripple marathon by running every day for 15km and going to the gym twice per week',
  id: 'bec49b7a-7819-453b-9895-347e3982acc5',
  priority: 'main',
  startDate: '2023-04-08',
};

const mockHabitFormData = {
  habitDescription: 'Exercise daily',
  habitType: 'develop',
  progressMetric: 'minutes',
};

const mockHabitData = {
  id: '66c8b782-6238-42a2-ab77-2c03d19b1d0f',
  habitDescription: 'Exercise daily',
  habitType: 'develop',
  progressMetric: 'minutes',
  goal: {
    id: 'bec49b7a-7819-453b-9895-347e3982acc5',
    goalDefinition:
      'Improve sleep quality by exercising and drinking less coffee',
    startDate: '2023-04-08',
    endDate: '2023-05-06',
  },
};

const mockHabitsData = [
  {
    id: 'a4e95781-9f45-4c38-8d67-21355fd5e228',
    habitDescription: 'Run 2 km every evening',
    habitType: 'develop',
    progressMetric: 'km',
    goal: {
      id: 'bec49b7a-7819-453b-9895-347e3982acc5',
      goalDefinition:
        'Improve sleep quality by exercising and drinking less coffee',
      priority: 'secondary',
      startDate: '2023-05-07',
      endDate: '2023-07-15',
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
      priority: 'secondary',
      startDate: '2023-05-07',
      endDate: '2023-07-15',
    },
  },
];

const fourHabitsMockData = [
  {
    id: 'a4e95781-9f45-4c38-8d67-21355fd5e228',
    habitDescription: 'Run 2 km every evening',
    habitType: 'develop',
    progressMetric: 'km',
    goal: {
      id: 'bec49b7a-7819-453b-9895-347e3982acc5',
      goalDefinition:
        'Improve sleep quality by exercising and drinking less coffee',
      priority: 'secondary',
      startDate: '2023-05-07',
      endDate: '2023-07-15',
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
      priority: 'secondary',
      startDate: '2023-05-07',
      endDate: '2023-07-15',
    },
  },
  {
    id: '66c8b782-6238-42a2-ab77-2c03d19b1d0f',
    habitDescription: 'Exercise daily',
    habitType: 'develop',
    progressMetric: 'minutes',
    goal: {
      id: 'bec49b7a-7819-453b-9895-347e3982acc5',
      goalDefinition:
        'Improve sleep quality by exercising and drinking less coffee',
      startDate: '2023-04-08',
      endDate: '2023-05-06',
    },
  },
  {
    id: '87c8b782-6238-42a2-ab77-2c03d19b1d05n',
    habitDescription: 'Do 15 minutes of yoga in the evening',
    habitType: 'develop',
    progressMetric: 'minutes',
    goal: {
      id: 'bec49b7a-7819-453b-9895-347e3982acc5',
      goalDefinition:
        'Improve sleep quality by exercising and drinking less coffee',
      startDate: '2023-04-08',
      endDate: '2023-05-06',
    },
  },
];

const editHabitData = {
  id: 'a4e95781-9f45-4c38-8d67-21355fd5e228',
  habitDescription: 'Run 20km every week',
  habitType: 'develop',
  progressMetric: 'km',
  goal: {
    id: 'bec49b7a-7819-453b-9895-347e3982acc5',
    goalDefinition:
      'Improve sleep quality by exercising and drinking less coffee',
    priority: 'secondary',
    startDate: '2023-05-07',
    endDate: '2023-07-15',
  },
};

export {
  editGoalData,
  editHabitData,
  fourHabitsMockData,
  storageJwtKey,
  mockJwt,
  mockGoalData1,
  mockGoalData2,
  mockGoalData3,
  mockGoalFormData,
  mockHabitData,
  mockHabitFormData,
  mockHabitsData,
  mockUserData,
};
