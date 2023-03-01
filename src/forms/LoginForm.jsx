import { Form, Formik } from 'formik';
import React from 'react';
// import { useDispatch } from 'react-redux';
// import { createUser } from '../actions-reducers/users';
import Button from '../core-components/Button';
import { loginScreen } from '../text/text';
// import { validateSignupForm } from '../utils/validation';
import { TextField } from './Fields';

const LoginForm = () => {
  // const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      // validate={(values) => validateSignupForm(values)}
      onSubmit={(values, actions) => {
        // dispatch(createUser(values));
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
              name="email"
              type="email"
              label="Email"
              placeholder="janedoe@example.com"
            />
            <TextField name="password" type="password" label="Password" />
            <Button
              variant="primaryLg"
              my={[4, 4, 3, 5, 5]}
              mx="auto"
              disabled={isSubmitting}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              {loginScreen.loginBtn}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
