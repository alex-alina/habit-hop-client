const homeScreen = {
  intro: 'Hello hopper...',
  signupBtn: 'Sign up',
  loginBtn: 'Log in',
};

const signupScreen = {
  intro: 'Create account',
  firstNameField: {
    label: 'First Name',
    placeholder: 'First name',
  },
  lastNameField: {
    label: 'Last Name',
    placeholder: 'Last name',
  },
  emailField: {
    label: 'Email address',
    placeholder: 'Email',
  },
  passwordField: {
    label: 'Password',
    placeholder: 'Password',
  },
  confirmPasswordField: {
    label: 'Confirma password',
    placeholder: 'Confirm Password',
  },
  signupBtn: 'Sign up',
};

const loginScreen = {
  intro: 'Welcome back hopper!',
  introMobile: 'Welcome back!',
  emailField: {
    label: 'Email address',
    placeholder: 'Email',
  },
  passwordField: {
    label: 'Password',
    placeholder: 'Password',
  },
  loginBtn: 'Log in',
  signupRedirect: {
    text: "Don't have an account yet?",
    link: 'Sign up',
  },
};

const goalsScreen = {
  logoutBtn: 'Log out',
  greeting: 'Hi ',
  noGoalsIntro: ' add your first goal.',
  goalsIntro: ' goals overview',
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
    showHabitsBtn: 'Show Habits',
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

export { homeScreen, signupScreen, loginScreen, goalsScreen };
