import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../actions-reducers/users';
import Button from '../core-components/Button';
import Paragraph from '../core-components/Paragraph';
import { signupScreen } from '../text/text';
import { localStorageJwtKey } from '../utils/constants';
import { validateSignupForm } from '../utils/validation';
import { InputField } from './Fields';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createUserError = useSelector((state) => state.user.error);

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
        localStorage.removeItem(localStorageJwtKey);
        dispatch(createUser(values))
          .unwrap()
          .then(() => {
            navigate('/goals');
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
            {createUserError && createUserError.message ? (
              <Paragraph mb={4} color="error" fontSize={4}>
                {createUserError.message}
              </Paragraph>
            ) : null}
            <InputField
              name="firstName"
              type="text"
              label="First Name"
              placeholder="First Name"
            />
            <InputField
              name="lastName"
              type="text"
              label="Last Name"
              placeholder="Last Name"
            />
            <InputField
              name="email"
              type="email"
              label="Email"
              placeholder="janedoe@example.com"
            />

            <InputField name="password" type="password" label="Password" />
            <InputField
              name="confirmPassword"
              type="password"
              label="Confirm Password"
            />

            <Button
              variant="primaryLg"
              mt={[3, 3, 3, 5, 5]}
              mb={6}
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
