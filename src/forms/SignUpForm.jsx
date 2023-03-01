import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../actions-reducers/users';
import Button from '../core-components/Button';
import { signupScreen } from '../text/text';
import { validateSignupForm } from '../utils/validation';
import { TextField } from './Fields';

const SignUpForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
      }}
      validate={(values) => validateSignupForm(values)}
      onSubmit={(values, actions) => {
        dispatch(createUser(values));
        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting, submitForm }) => {
        return (
          <Form
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <TextField
              name="firstName"
              type="text"
              label="First Name"
              placeholder="First Name"
            />
            <TextField
              name="lastName"
              type="text"
              label="Last Name"
              placeholder="Last Name"
            />
            <TextField
              name="email"
              type="email"
              label="Email"
              placeholder="janedoe@example.com"
            />

            <TextField name="password" type="password" label="Password" />
            <TextField
              name="confirmPassword"
              type="password"
              label="Confirm Password"
            />

            <Button
              variant="primaryLg"
              my={[3, 3, 3, 5, 5]}
              mx="auto"
              disabled={isSubmitting}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              {signupScreen.signupBtn}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
