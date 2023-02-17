import React from 'react';
import { Link } from 'react-router-dom';
import Div from '../core-components/Div';

const LogIn = () => {
  return (
    <Div
      mt={3}
      alignItems="center"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      width={300}
      height={100}
    >
      Login
      <Link to="/signup">
        <button>back</button>
      </Link>
      <Link to="/">
        <button>Take me home</button>
      </Link>
    </Div>
  );
};

export default LogIn;
