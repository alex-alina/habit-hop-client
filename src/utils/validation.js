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

export const validateSignupForm = (values) => {
  console.log('values', values);
  const { email, firstName, lastName, password, confirmPassword } = values;

  const errors = {};
  errors.email = validateEmail(email);
  errors.firstName = validateName(firstName);
  errors.lastName = validateName(lastName);
  errors.password = validatePassword(password);
  errors.confirmPassword = validateConfirmPassword(password, confirmPassword);

  //workaround isValid bug in Formik
  const cleanErrors = Object.keys(errors)
    .filter((key) => errors[key] !== undefined)
    .reduce((res, key) => {
      res[key] = errors[key];
      return res;
    }, {});

  return cleanErrors;
};
