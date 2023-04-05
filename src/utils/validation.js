import { isPresentDate, isOneWeekFromDate } from './date';

const validateEmail = (email) => {
  let error;
  if (!email) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    error = 'Invalid email address';
  }
  return error;
};

const validateName = (name) => {
  let error;
  if (!name) {
    error = 'Required';
  } else if (name.length < 2) {
    error = 'Name must have at least 2 characters';
  }
  return error;
};

const validatePassword = (password) => {
  let error;
  if (!password) {
    error = 'Required';
  } else if (password.length < 8) {
    error = 'Pasword must have at least 8 characters';
  }
  return error;
};

const validateConfirmPassword = (password, confirmPassword) => {
  let error;
  if (!confirmPassword) {
    error = 'Required';
  } else if (confirmPassword !== password) {
    error = "Passwords don't match";
  }
  return error;
};

const validateTextBlocks = (value, minChars, maxChars) => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (value.length < minChars) {
    error = 'Goal description must have at least 20 characters';
  } else if (value.length > maxChars) {
    error = 'Goal description must have less than 300 characters';
  }
  return error;
};

const validateGoalPriority = (value) => {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
};

const validateStartDateInput = (value = null) => {
  let error;

  if (!value) {
    error = 'Required';
  } else if (!isPresentDate(value)) {
    error = "You can't add a date in the past";
  }

  return error;
};

const validateEndDateInput = (value, startDateValue) => {
  let error;

  if (!value) {
    error = 'Required';
  } else if (!isPresentDate(value)) {
    error = "You can't add a date in the past";
  } else if (!isOneWeekFromDate(startDateValue, value)) {
    error = 'You must alllow at least one week between the start and end dates';
  }
  return error;
};

//workaround for isValid bug in Formik
const cleanUpErrors = (errors) => {
  const definedErrors = Object.keys(errors)
    .filter((key) => errors[key] !== undefined)
    .reduce((res, key) => {
      res[key] = errors[key];
      return res;
    }, {});

  return definedErrors;
};

const validateSignupForm = (values) => {
  const { email, firstName, lastName, password, confirmPassword } = values;

  const errors = {};
  errors.email = validateEmail(email);
  errors.firstName = validateName(firstName);
  errors.lastName = validateName(lastName);
  errors.password = validatePassword(password);
  errors.confirmPassword = validateConfirmPassword(password, confirmPassword);

  const cleanErrors = cleanUpErrors(errors);
  return cleanErrors;
};

const validateLoginForm = (values) => {
  const { email, password } = values;

  const errors = {};
  errors.email = validateEmail(email);
  errors.password = validatePassword(password);

  const cleanErrors = cleanUpErrors(errors);
  return cleanErrors;
};

const validateGoalsForm = (values) => {
  const { goalDefinition, priority, startDate, endDate } = values;

  const errors = {};
  errors.goalDefinition = validateTextBlocks(goalDefinition, 20, 300);
  errors.priority = validateGoalPriority(priority);
  errors.startDate = validateStartDateInput(startDate);
  errors.endDate = validateEndDateInput(endDate, startDate);

  const cleanErrors = cleanUpErrors(errors);
  return cleanErrors;
};

export { validateSignupForm, validateLoginForm, validateGoalsForm };
