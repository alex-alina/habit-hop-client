import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser } from '../actions-reducers/users';
import Button from '../core-components/Button';
import Div from '../core-components/Div';
import { Form, Formik, useField } from 'formik';
import { ReactComponent as BackIcon } from '../assets/blue_icons/arrow-left.svg';
import { ReactComponent as Welcome } from '../assets/illustrations/welcome.svg';
import Heading from '../core-components/Heading';
import { signupScreen } from '../text/text';

const TextField = ({ label, ...props }) => {
  const [field, meta /*helpers*/] = useField(props);
  return (
    <>
      <label>
        {label}
        <input {...field} {...props} />
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const SignUp = () => {
  const dispatch = useDispatch();

  return (
    <Div
      display="flex"
      flexDirection={['column', 'column', 'column', 'column', 'row']}
      width="100%"
    >
      <Div
        display={['none', 'none', 'none', 'none', 'flex']}
        alignItems="center"
        justify-content="space-around"
        width="40%"
        height="100vh"
        bg="blue.8"
        px={9}
      >
        <Welcome width="100%" height="auto" />
      </Div>

      <Div
        display={['flex', 'flex', 'flex', 'flex', 'none']}
        flexDirection="row"
        justifyContent="center"
        bg="blue.8"
        p={3}
      >
        <Welcome width="80%" height="15%" />
      </Div>

      <Div display="flex" flexDirection="column" p={9}>
        <Link to="/">
          <Button
            variant="roundButton"
            mb={8}
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <BackIcon width={24} height={24} />
          </Button>
        </Link>
        <Heading
          color="heading"
          as="h1"
          fontWeight={1}
          fontSize={[7, 7, 8, 8, 8]}
          fontFamily="heading"
          mb={[0, 0, 0, 5, 5]}
        >
          {signupScreen.intro}
        </Heading>
        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(values, actions) => {
            dispatch(createUser(values));
            actions.setSubmitting(false);
          }}
        >
          {() => (
            <Form>
              <Div
                display="flex"
                justifyContent="center"
                flexDirection="column"
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
                  disabled={false}
                  type="submit"
                  // onClick={() => dispatch(createUser(userData))}
                >
                  {signupScreen.signupBtn}
                </Button>
              </Div>
            </Form>
          )}
        </Formik>
      </Div>
    </Div>
  );
};

export default SignUp;
