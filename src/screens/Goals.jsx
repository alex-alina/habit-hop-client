import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import GoalCard from '../components/GoalCard';
import IconButton from '../components/IconButton';
import Button from '../core-components/Button';
import Div from '../core-components/Div';
import Header from '../core-components/Heading';
import GoalForm from '../forms/GoalForm';
import { goalsScreen } from '../text/text';
import { localStorageJwtKey } from '../utils/constants';
import { extractUserId, isExpired } from '../utils/jwt';

const Goals = ({ content = goalsScreen }) => {
  const {
    logoutBtn,
    greeting,
    goalsIntro,
    noGoalsIntro,
    maxNumOfGoalsInfo,
    goalCard,
    addGoalBtn,
  } = content;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = localStorage.getItem(localStorageJwtKey);
  const userId = userToken && extractUserId(userToken);

  const user = useSelector((state) => state.user);
  const goals = useSelector((state) => state.goals.items);
  const showAddGoalBtn = goals && goals.length > 0 && goals.length < 3;

  const [goalFormIsVisible, setGoalFormVisibility] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedGoal, setEditedGoal] = useState(null);

  const handleCloseOverlay = () => setGoalFormVisibility(false);

  const handleAddGoal = (goal) => {
    dispatch(addGoal({ userId, userToken, goal }));
  };

  const handlEditGoal = (updatedGoal, goalId) => {
    dispatch(editGoal({ userId, userToken, goalId, updatedGoal }));
  };

  const handleDelete = (e, goalId) => {
    e.preventDefault();
    dispatch(deleteGoal({ userId, userToken, goalId }));
  };

  const handleEdit = (e, goal) => {
    e.preventDefault();
    setIsEditMode(true);
    setEditedGoal(goal);
    setGoalFormVisibility(true);
  };

  useEffect(() => {
    if (userId && userToken) {
      dispatch(getCurrentUser({ userId, userToken }));
      dispatch(getGoals({ userId, userToken }));
    }
    if (!userToken || isExpired(userToken)) {
      dispatch(logout());
      navigate('/login');
    }
  }, [userToken]);

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
              navigate('/login');
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
                {user.firstName},{noGoalsIntro}
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
          {goals &&
            goals.length > 0 &&
            goals.map((goal, i) => {
              const goalId = goal.id;
              return (
                <GoalCard
                  key={i}
                  goal={goal}
                  goalCardText={goalCard}
                  handleDelete={(e) => handleDelete(e, goalId)}
                  handleEdit={(e) => handleEdit(e, goal)}
                />
              );
            })}
          {showAddGoalBtn && (
            <IconButton
              clickHandler={() => {
                setIsEditMode(false);
                setGoalFormVisibility(true);
              }}
              iconName="add-one"
              variant="secondarySm"
              mt={[2, 2, 2, 4, 4]}
              mb={6}
            >
              {addGoalBtn}
            </IconButton>
          )}
        </Div>
      </Div>
    </Div>
  );
};

export default Goals;
