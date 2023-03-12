import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  addGoal,
  deleteGoal,
  editGoal,
  getGoals,
} from '../actions-reducers/goals';
import { logout } from '../actions-reducers/logout';
import { getCurrentUser } from '../actions-reducers/users';
import { ReactComponent as GoalsOverviewImg } from '../assets/illustrations/goals-bg.svg';
import Banner from '../components/Banner';
import FormsOverlay from '../components/FormOverlay';
import IconButton from '../components/IconButton';
import Button from '../core-components/Button';
import Div from '../core-components/Div';
import Header from '../core-components/Heading';
import Paragraph from '../core-components/Paragraph';
import Span from '../core-components/Span';
import GoalForm from '../forms/GoalForm';
import { goalsScreen } from '../text/text';
import { localStorageJwtKey } from '../utils/constants';
import { capitalizeWord } from '../utils/format';
import { extractUserId, isExpired } from '../utils/jwt';

const { greeting, logoutBtn, goalsIntro, noGoalsHeader, maxNumOfGoalsInfo } =
  goalsScreen;

const Goals = () => {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem(localStorageJwtKey);
  const userId = userToken && extractUserId(userToken);

  const user = useSelector((state) => state.user);
  const goals = useSelector((state) => state.goals.items);

  const [goalFormIsVisible, setGoalFormVisibility] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedGoal, setEditedGoal] = useState(null);
  const showAddGoalBtn = goals && goals.length > 0 && goals.length < 3;

  const handleCloseOverlay = () => setGoalFormVisibility(!goalFormIsVisible);

  const handleAddGoal = (goal) => {
    dispatch(addGoal({ userId, userToken, goal }));
  };

  const handlEditGoal = (updatedGoal, goalId) => {
    dispatch(editGoal({ userId, userToken, goalId, updatedGoal }));
  };

  const handleGoalFormVisibility = () => {
    setGoalFormVisibility(!goalFormIsVisible);
  };

  useEffect(() => {
    if (userId && userToken) {
      dispatch(getCurrentUser({ userId, userToken }));
      dispatch(getGoals({ userId, userToken }));
    }
    if (!userToken || isExpired(userToken)) {
      dispatch(logout());
      setShouldRedirect(true);
    }
  }, [userToken, shouldRedirect]);

  if (shouldRedirect) {
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
        <FormsOverlay closeHandler={handleCloseOverlay}>
          <GoalForm
            handleSubmit={isEditMode ? handlEditGoal : handleAddGoal}
            handleCloseOverlay={handleCloseOverlay}
            goal={isEditMode ? editedGoal : null}
          />
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
        >
          <Button
            variant="secondaryMd"
            my={4}
            mx={[2, 2, 2, 2, 7]}
            onClick={(e) => {
              e.preventDefault();
              dispatch(logout());
              setShouldRedirect(!shouldRedirect);
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
                mt={1}
                mb={3}
                textAlign={['center', 'center', 'center', 'left', 'left']}
              >
                {greeting}
                {user.firstName},{noGoalsHeader}
              </Header>

              <GoalForm handleSubmit={handleAddGoal} />
            </>
          ) : (
            <Div
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={6}
              mt={1}
            >
              <Header>
                {user.firstName}'s {goalsIntro}
              </Header>
              {!showAddGoalBtn && (
                <Banner iconName="tips" mt={4}>
                  {maxNumOfGoalsInfo}
                </Banner>
              )}
            </Div>
          )}
          {goals && goals.length > 0
            ? goals.map((goal, i) => {
                const goalPriority = capitalizeWord(goal.priority);
                const goalId = goal.id;

                const handleDelete = (e) => {
                  e.preventDefault();
                  dispatch(deleteGoal({ userId, userToken, goalId }));
                };

                const handleEdit = (e) => {
                  e.preventDefault();
                  setIsEditMode(true);
                  setEditedGoal(goal);
                  handleGoalFormVisibility();
                };

                return (
                  <Div
                    key={i}
                    width={['90%', '90%', '90%', '90%', '80%']}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    mb={4}
                    bg="white"
                    borderRadius={1}
                    borderWidth="2px"
                    borderStyle="solid"
                    borderColor="blue.2"
                    px={[4, 4, 4, 6, 6]}
                    py={4}
                  >
                    <Div display="flex" justifyContent="space-between" mb={4}>
                      <IconButton
                        clickHandler={handleEdit}
                        iconName="write"
                        variant="secondarySm"
                        width={120}
                      >
                        Edit
                      </IconButton>
                      <IconButton
                        clickHandler={handleDelete}
                        iconName="delete"
                        stroke="#922B21"
                        variant="secondaryDangerSm"
                        width={120}
                      >
                        Delete
                      </IconButton>
                    </Div>
                    <Div
                      display="flex"
                      flexDirection={[
                        'column',
                        'column',
                        'column',
                        'row',
                        'row',
                      ]}
                      justifyContent="space-between"
                      borderTop="2px solid #C5CAE9"
                      pt={3}
                    >
                      <Div
                        display="flex"
                        flexDirection="column"
                        width={['90%', '90%', '90%', '40%', '40%']}
                      >
                        <Header as="h3" fontSize={4}>
                          {goalPriority} goal
                        </Header>
                        <Paragraph mt={2} mr={6}>
                          {goal.goalDefinition}
                        </Paragraph>
                      </Div>

                      <Div
                        display="flex"
                        flexDirection="column"
                        mt={[4, 4, 4, 0, 0]}
                        width={['90%', '90%', '90%', '40%', '40%']}
                      >
                        <Header as="h4" fontSize={4} mb={1}>
                          Timeframe
                        </Header>
                        <Paragraph mb={1}>
                          <Span color="heading">Starts on: </Span>
                          {goal.startDate}
                        </Paragraph>
                        <Paragraph>
                          <Span color="heading">Ends on: </Span>
                          {goal.endDate}
                        </Paragraph>
                      </Div>
                    </Div>
                    <Button
                      variant="secondarySm"
                      mx="auto"
                      mt={5}
                      maxWidth={150}
                    >
                      Show Habits
                    </Button>
                  </Div>
                );
              })
            : null}
          {showAddGoalBtn && (
            <IconButton
              clickHandler={() => {
                setIsEditMode(false);
                handleGoalFormVisibility();
              }}
              iconName="add-one"
              variant="secondarySm"
              mt={[2, 2, 2, 4, 4]}
              mb={6}
            >
              Add goal
            </IconButton>
          )}
        </Div>
      </Div>
    </Div>
  );
};

export default Goals;
