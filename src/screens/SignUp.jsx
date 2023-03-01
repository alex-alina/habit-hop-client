import { Form, Formik, useField } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser } from '../actions-reducers/users';
import { ReactComponent as BackIcon } from '../assets/blue_icons/arrow-left.svg';
import { ReactComponent as WelcomeSVG } from '../assets/illustrations/welcome.svg';
import Button from '../core-components/Button';
import Div from '../core-components/Div';
import Heading from '../core-components/Heading';
import { TextInput } from '../core-components/Input';
import Label from '../core-components/Label';
import Paragraph from '../core-components/Paragraph';
import { signupScreen } from '../text/text';
import { validateSignupForm } from '../utils/validation';

const TextField = ({ label, ...props }) => {
  const [field, meta /*helpers*/] = useField(props);

  return (
    <Div display="flex" flexDirection="column" mb={2}>
      <Label>{label}</Label>
      <TextInput {...field} {...props} />
      <Div>
        {meta.touched && meta.error ? (
          <Paragraph mb={2} color="error">
            {meta.error}
          </Paragraph>
        ) : null}
      </Div>
    </Div>
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
        width="50%"
        height="100vh"
        bg="blue.8"
        px={9}
      >
        <WelcomeSVG width="100%" height="auto" />
      </Div>

      <Div
        display={['flex', 'flex', 'flex', 'flex', 'none']}
        flexDirection="row"
        justifyContent="center"
        bg="blue.8"
        px={3}
        pt={3}
      >
        <WelcomeSVG width="80%" height="15%" />
      </Div>

      <Div
        display="flex"
        flexDirection="column"
        width={['100%', '100%', 'auto', 'auto', ' 50%']}
        pt={[2, 2, 2, 2, 5]}
      >
        <Button
          display={['none', 'none', 'none', 'none', 'flex']}
          variant="roundButtonLg"
          alignItems="center"
          flexDirection="column"
          width={40}
          height={40}
          ml={[2, 2, 2, 2, 5]}
        >
          <Link to="/">
            <BackIcon width={26} height={26} />
          </Link>
        </Button>

        <Button
          display={['flex', 'flex', 'flex', 'flex', 'none']}
          variant="roundButtonLg"
          position="absolute"
          top={2}
          alignItems="center"
          flexDirection="column"
          ml={[2, 2, 2, 2, 9]}
        >
          <Link to="/">
            <BackIcon width={26} height={26} />
          </Link>
        </Button>

        <Div
          mx="auto"
          mt={3}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width={[300, 300, 350, 350, 350]}
        >
          <Heading
            as="h1"
            fontSize={[7, 7, 8, 8, 8]}
            mb={[2, 2, 2, 3, 3]}
            mt={2}
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
            validate={validateSignupForm}
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
                    mx="auto"
                    disabled={false}
                    type="submit"
                  >
                    {signupScreen.signupBtn}
                  </Button>
                </Div>
              </Form>
            )}
          </Formik>
        </Div>
      </Div>
    </Div>
  );
};

export default SignUp;
