import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Div from '../core-components/Div';
import Header from '../core-components/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../actions-reducers/users';
import { getGoals } from '../actions-reducers/goals';

const Goals = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.login.userId);
  const userToken = useSelector((state) => state.login.userJwt);
  const user = useSelector((state) => state.user);
  const goals = useSelector((state) => state.goals);
  console.log('goals', goals);
  console.log('hehe', [{ a: 8 }, { b: 4 }]);
  useEffect(() => {
    if (userId && userToken) {
      dispatch(getCurrentUser({ userId, userToken }));
      dispatch(getGoals({ userId, userToken }));
    }
  }, [userId, userToken]);

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
      <Header>{user.firstName}</Header>
      <Link to="/login">
        <button>back</button>
      </Link>
      <Link to="/">
        <button>Take me home</button>
      </Link>
    </Div>
  );
};

export default Goals;
