import React from 'react';
import { Link } from 'react-router-dom';
import Div from '../core-components/Div';
import Button from '../core-components/Button';

const SignUp = () => {
  return (
    <Div
      alignItems="center"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      width={300}
      height={200}
    >
      Start your jurney here:
      <Button
        variant="primaryLg"
        disabled={false}
        onClick={() => console.log('clicked')}
      >
        Create account
      </Button>
      <Link to="/goals">
        <button>Go go goals!</button>
      </Link>
      <Link to="/">
        <button>Back home</button>
      </Link>
    </Div>
  );
};

export default SignUp;
