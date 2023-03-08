import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as WelcomeSVG } from '../assets/illustrations/welcome.svg';
import SvgIcon from '../components/SvgIcon';
import Button from '../core-components/Button';
import Div from '../core-components/Div';
import Heading from '../core-components/Heading';
import SignUpForm from '../forms/SignUpForm';
import { signupScreen } from '../text/text';

const SignUp = () => {
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
        <WelcomeSVG width="100%" height="100%" />
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
          mt={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width={['90%', '90%', '100%', '100%', '100%']}
          maxWidth={[360, 360, 400, 400, 400]}
        >
          <Heading
            as="h1"
            fontSize={[6, 6, 7, 7, 7]}
            mb={[2, 2, 2, 3, 3]}
            mt={(2, 2, 4, 4, 4)}
          >
            {signupScreen.intro}
          </Heading>
          <SignUpForm />
        </Div>
      </Div>
    </Div>
  );
};

export default SignUp;
