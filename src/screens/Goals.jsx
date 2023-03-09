import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getGoals } from '../actions-reducers/goals';
import { logout } from '../actions-reducers/logout';
import { getCurrentUser } from '../actions-reducers/users';
import { ReactComponent as GoalsOverviewImg } from '../assets/illustrations/goals-bg.svg';
import SvgIcon from '../components/SvgIcon';
import Button from '../core-components/Button';
import Div from '../core-components/Div';
import Header from '../core-components/Heading';
import Paragraph from '../core-components/Paragraph';
import Span from '../core-components/Span';
import { goalsScreen } from '../text/text';
import { localStorageJwtKey } from '../utils/constants';
import { parseDateToDDMonthYYYY } from '../utils/date';
import { capitalizeWord } from '../utils/format';
import { extractUserId, isExpired } from '../utils/jwt';
import GoalForm from '../forms/GoalForm';
import FormsOverlay from '../components/FormOverlay';

const { greeting, logoutBtn, goalsIntro, noGoalsHeader } = goalsScreen;

const Goals = () => {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem(localStorageJwtKey);
  const userId = userToken && extractUserId(userToken);
  const login = useSelector((state) => state.login);
  const user = useSelector((state) => state.user);
  const goals = useSelector((state) => state.goals.items);
  const [goalFormIsVisible, setGoalFormVisibility] = useState(false);
  const showAddGoalBtn = goals && goals.length > 1 && goals.length < 4;

  const closeHandler = () => setGoalFormVisibility(!goalFormIsVisible);

  useEffect(() => {
    if (userId && userToken) {
      dispatch(getCurrentUser({ userId, userToken }));
      dispatch(getGoals({ userId, userToken }));
    }
  }, [userToken]);
  if (login.status !== 'success') {
    return <Navigate replace to="/login" />;
  }
  if (isExpired(userToken)) {
    dispatch(logout());
    return <Navigate replace to="/login" />;
  }

  return (
    <Div width="100%">
      <Div
        zIndex={0}
        width="100%"
        height="100vh"
        display={['none', 'none', 'none', 'flex', 'flex']}
      >
        <GoalsOverviewImg width="100%" height="100%" />
      </Div>
      {goalFormIsVisible && (
        <FormsOverlay closeHandler={closeHandler}>
          <GoalForm handleSubmit={() => console.log('hello')} />
        </FormsOverlay>
      )}

      <Div
        display="flex"
        flexDirection="column"
        alignItems="center"
        alignContent="center"
        width="100%"
        position="absolute"
        top="0"
      >
        <Div
          width="100%"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          mb={2}
        >
          <Button
            variant="secondaryMd"
            my={4}
            mx={[2, 2, 2, 2, 7]}
            onClick={(e) => {
              e.preventDefault();
              dispatch(logout());
            }}
          >
            {logoutBtn}
          </Button>
        </Div>
        <Div
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          mx="auto"
          width={['90%', '90%', '80%', '80%', '65%']}
        >
          {goals && goals.length === 0 ? (
            <>
              <Header
                mt={2}
                mb={4}
                textAlign={['center', 'center', 'center', 'left', 'left']}
              >
                {greeting}
                {user.firstName},{noGoalsHeader}
              </Header>

              <GoalForm handleSubmit={() => console.log('hello')} />
            </>
          ) : (
            <Header mb={4} mt={2}>
              {user.firstName}'s {goalsIntro}
            </Header>
          )}

          {/* {addGoalisVisible && (
            <GoalForm handleSubmit={() => console.log('hello')} />
          )} */}

          {goals && goals.length > 0
            ? goals.map((goal, i) => {
                const goalPriority = capitalizeWord(goal.priority);
                return (
                  <Div
                    key={i}
                    width={['90%', '90%', '90%', '80%', '80%']}
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    mb={4}
                    bg="white"
                    borderRadius={1}
                    borderWidth="2px"
                    borderStyle="solid"
                    borderColor="blue.2"
                    px={4}
                    pt={4}
                    pb={2}
                  >
                    <Div display="flex" justifyContent="space-between">
                      <Span display="flex">
                        <Div display="flex" alignItems="center">
                          <Header as="h3" fontSize={4} mr={2}>
                            {goalPriority}
                          </Header>
                          <SvgIcon name="write" width={22} height={22} />
                        </Div>
                      </Span>
                      <Button variant="iconButton">
                        <SvgIcon name="delete" stroke="#922B21" />
                      </Button>
                    </Div>

                    <Paragraph ml={2}>{goal.goalDefinition}</Paragraph>
                    <Div>
                      <Header as="h4" fontSize={4} mt={2} mb={1}>
                        Timeframe
                      </Header>
                      <Paragraph mb={1} ml={2}>
                        <Span color="heading">Starts on: </Span>
                        {parseDateToDDMonthYYYY(goal.startDate)}
                      </Paragraph>
                      <Paragraph ml={2}>
                        <Span color="heading">Ends on: </Span>
                        {parseDateToDDMonthYYYY(goal.endDate)}
                      </Paragraph>
                    </Div>

                    <Button
                      variant="secondarySm"
                      mx="auto"
                      mt={4}
                      maxWidth={150}
                    >
                      Show Habits
                    </Button>
                  </Div>
                );
              })
            : null}
          {showAddGoalBtn && (
            <Button
              variant="secondarySm"
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={6}
              onClick={() => {
                setGoalFormVisibility(!goalFormIsVisible);
              }}
            >
              Add goal{' '}
              <SvgIcon
                width={20}
                height={20}
                name="add-one"
                style={{ marginLeft: 8 }}
              />
            </Button>
          )}
        </Div>
      </Div>
    </Div>
  );
};

export default Goals;
