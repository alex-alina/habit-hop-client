export const validate = (values) => {
  const { email, firstName, lastName, password, confirmPassword } = values;

  const errors = {};
  if (!email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }

  if (!firstName) {
    errors.firstName = 'Required';
  } else if (firstName.length < 2) {
    errors.firstName = 'Name must have at least 2 characters';
  }

  if (!lastName) {
    errors.lastName = 'Required';
  } else if (lastName.length < 2) {
    errors.lastName = 'Name must have at least 2 characters';
  }

  if (!password) {
    errors.password = 'Required';
  } else if (password.length < 8) {
    errors.password = 'Pasword must have at least 8 characters';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (confirmPassword.length < 8) {
    errors.confirmPassword = "Passwords don't match";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords don't match";
  }

  return errors;
};
