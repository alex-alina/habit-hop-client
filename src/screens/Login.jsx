import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LoginHumanSVG } from '../assets/illustrations/login-humaaan.svg';
import Button from '../core-components/Button';
import Div from '../core-components/Div';
import Heading from '../core-components/Heading';
import { loginScreen } from '../text/text';
import SvgIcon from '../components/SvgIcon';
import LoginForm from '../forms/LoginForm';

const Login = () => {
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
        <LoginHumanSVG width="100%" height="100%" />
      </Div>

      <Div
        display={['flex', 'flex', 'flex', 'flex', 'none']}
        flexDirection="row"
        justifyContent="center"
        bg="blue.8"
        px={3}
        pt={3}
      >
        <LoginHumanSVG width="80%" height="15%" />
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
            <SvgIcon name="arrow-left" />
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
            <SvgIcon name="arrow-left" />
          </Link>
        </Button>

        <Div
          mx="auto"
          mt={3}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width={['90%', '90%', '100%', '100%', '100%']}
          maxWidth={[300, 300, 420, 420, 420]}
        >
          <Heading
            as="h1"
            display={['none', 'none', 'block', 'block', 'block']}
            fontSize={7}
            mb={3}
            mt={[null, null, 6, 6, 9]}
          >
            {loginScreen.intro}
          </Heading>
          <Heading
            as="h1"
            display={['block', 'block', 'none', 'none', 'none']}
            fontSize={6}
            mb={4}
            mt={4}
          >
            {loginScreen.introMobile}
          </Heading>
          <LoginForm />
        </Div>
      </Div>
    </Div>
  );
};

export default Login;
