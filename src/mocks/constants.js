export const storageJwtKey = 'jwt';
export const mockJwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRjM2MxMWJmLTU4NGMtNDA5MC1hYThiLTM5ZTQzY2ZhZmNhYiIsImlhdCI6MTY4MTQyMDcwMCwiZXhwIjoxNjgxNDI3OTAwfQ.sYclsZo_DO9zZ2375Kg-AiGZpiVvox1NojPK3eGj9k4';
export const mockUserData = {
  createdAt: '2023-04-25T19:08:15.956Z',
  id: 'dc3c11bf-584c-4090-aa8b-39e43cfafcab',
  email: 'test@example.com',
  firstName: 'Billie',
  lastName: 'Test',
  lastLogin: '2023-04-25T19:08:15.956Z',
};

export const mockGoalFormData = {
  goalDefinition:
    'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
  priority: 'main',
  startDate: '2023-03-23',
  endDate: '2023-06-16',
};

export const mockGoalData1 = {
  endDate: '2023-05-06',
  goalDefinition:
    'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
  id: 'bec49b7a-7819-453b-9895-347e3982acc5',
  priority: 'main',
  startDate: '2023-04-08',
};

export const mockGoalData2 = {
  endDate: '2023-05-06',
  goalDefinition:
    'I want to learn how to play guitar, and be able to play 3 songs by the end of the year',
  id: '44d96277-99ea-4a83-ab80-deed9148ddc1',
  priority: 'main',
  startDate: '2023-04-08',
};

export const mockGoalData3 = {
  endDate: '2023-05-06',
  goalDefinition:
    'I want to learn how to bake muffins, cupcakes and birthday cakes by baking every weekend for six months',
  id: '1c8a4a14-7fed-4a91-b48b-a9290677043d',
  priority: 'main',
  startDate: '2023-04-08',
};

export const editGoalData = {
  endDate: '2023-05-06',
  goalDefinition:
    'Train for a tripple marathon by running every day for 15km and going to the gym twice per week',
  id: 'bec49b7a-7819-453b-9895-347e3982acc5',
  priority: 'main',
  startDate: '2023-04-08',
};

export const mockHabitFormData = {
  habitDescription: 'Exercise daily',
  habitType: 'develop',
  progressMetric: 'minutes',
};

export const mockHabitData = {
  id: '66c8b782-6238-42a2-ab77-2c03d19b1d0f',
  habitDescription: 'Exercise daily',
  habitType: 'develop',
  progressMetric: 'minutes',
  goal: {
    id: 'bec49b7a-7819-453b-9895-347e3982acc5',
    goalDefinition:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    priority: 'main',
    startDate: '2023-04-08',
    endDate: '2023-05-06',
  },
};

export const mockHabitsData = [
  {
    id: 'aa750fa3-2643-4d84-b4b5-090162ae08b6',
    habitDescription: 'Stop using screens after 20.30',
    habitType: 'break',
    progressMetric: 'is-completed',
    goal: {
      id: 'bec49b7a-7819-453b-9895-347e3982acc5',
      goalDefinition:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
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
      id: 'bec49b7a-7819-453b-9895-347e3982acc5',
      goalDefinition:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      priority: 'secondary',
      startDate: '2023-05-07',
      endDate: '2023-07-15',
    },
  },
];
