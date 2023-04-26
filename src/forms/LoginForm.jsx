import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../actions-reducers/login';
import Button from '../core-components/Button';
import Paragraph from '../core-components/Paragraph';
import { validateLoginForm } from '../utils/validation';
import { InputField } from './Fields';

const LoginForm = ({ content }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.login.error);

  const { emailField, passwordField, loginBtn } = content;

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validate={(values) => validateLoginForm(values)}
      onSubmit={(values, actions) => {
        dispatch(loginUser(values))
          .unwrap()
          .then(() => {
            navigate('/goals');
          })
          .catch((err) => {
            err;
          });
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
            <InputField
              name="email"
              type="email"
              label={emailField.label}
              placeholder={emailField.placeholder}
            />
            <InputField
              name="password"
              type="password"
              label={passwordField.label}
              placeholder={passwordField.placeholder}
            />
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
              {loginBtn}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
