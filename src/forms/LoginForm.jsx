import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../actions-reducers/login';
import Button from '../core-components/Button';
import Paragraph from '../core-components/Paragraph';
import { loginScreen } from '../text/text';
import { TextField } from './Fields';

const LoginForm = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.login.status);
  const loginError = useSelector((state) => state.login.error);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, actions) => {
        dispatch(loginUser(values));
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
            {loginError && loginError.message ? (
              <Paragraph mb={4} color="error" fontSize={4}>
                {loginError.message}
              </Paragraph>
            ) : null}
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
            {loginStatus === 'success' ? (
              <Navigate replace to="/goals" />
            ) : null}
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
