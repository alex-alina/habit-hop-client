import React from 'react';
import { Link } from 'react-router-dom';
import Div from '../core-components/Div';
import Button from '../core-components/Button';
import { createUser } from '../actions-reducers/users';
import { useDispatch } from 'react-redux';
// import * as superagent from 'superagent';

const userData = {
  firstName: 'Test',
  lastName: 'Super',
  email: `hi${Date.now()}bye@exxample.com`,
  password: 'testPass',
  confirmPassword: 'testPass',
};

// const handler = async (userData) => {
//   try {
//     const response = await superagent
//       .post('http://localhost:3002/users')
//       .send(userData);
//     console.log('response', response.body);
//     return response.body.data.rest;
//   } catch (err) {
//     console.log(err);
//     throw new Error(err);
//   }
// };

const SignUp = () => {
  const dispatch = useDispatch();

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
        onClick={() => dispatch(createUser(userData))}
        // onClick={() => handler(userData)}
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
