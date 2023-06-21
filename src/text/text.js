const homeScreen = {
  intro: 'Hello hopper...',
  signupBtn: 'Sign up',
  loginBtn: 'Log in',
};

const signupScreen = {
  intro: 'Create account',
  form: {
    firstNameField: {
      label: 'First Name',
      placeholder: 'First name',
    },
    lastNameField: {
      label: 'Last Name',
      placeholder: 'Last name',
    },
    emailField: {
      label: 'Email',
      placeholder: 'janedoe@example.com',
    },
    passwordField: {
      label: 'Password',
      placeholder: 'Password',
    },
    confirmPasswordField: {
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
    },
    signupBtn: 'Sign up',
  },
};

const loginScreen = {
  intro: 'Welcome back hopper!',
  introMobile: 'Welcome back!',
  form: {
    emailField: {
      label: 'Email',
      placeholder: 'janedoe@example.com',
    },
    passwordField: {
      label: 'Password',
      placeholder: 'Password',
    },
    loginBtn: 'Log in',
  },
  signupRedirect: {
    text: "Don't have an account yet?",
    link: 'Sign up',
  },
};

const goalsScreen = {
  logoutBtn: 'Log out',
  greeting: 'Hi ',
  noGoalsIntro: 'Add your first goal...',
  goalsIntro: "Goals' overview",
  maxNumOfGoalsInfo:
    'You can add a maximum of three goals. Edit or replace your goals to fit your current needs.',
  loadingText: 'Loading...',
  addGoalBtn: 'Add goal',
  goalCard: {
    editBtn: 'Edit',
    deleteBtn: 'Delete',
    timeSection: {
      title: 'Timeframe',
      startLabel: 'Starts on: ',
      endLabel: 'Ends on: ',
    },
    habitsOverviewLink: "Habit's overview",
    addHabitBtn: 'Add habit',
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
  },
  habitForm: {
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
        {
          legend: 'Completion:',
          radios: [{ label: 'finished activity', value: 'is-completed' }],
        },
      ],
    },
    button: 'Add new habit',
    editButton: 'Update habit',
  },
  goalsForm: {
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
  },
};

const habitsScreen = {
  logoutBtn: 'Log out',
  intro: "Habits' Overview",
  noHabitsIntro: 'Oops, you have no habits for this goal...',
  addHabitBtn: 'Add habit',
  habitCard: {
    settingsBtn: 'Settings',
    editBtn: 'Edit',
    deleteBtn: 'Delete',
    newEntryBtn: 'New Entry',
    showEntriesBtn: 'Show entries',
    hideEntriesBtn: 'Hide entries',
    developIcon: 'check-one',
    breakIcon: 'close-one',
  },
  maxNumOfHabitsInfo: 'You can add a maximum of four habits per goal',
};

export { homeScreen, signupScreen, loginScreen, goalsScreen, habitsScreen };
