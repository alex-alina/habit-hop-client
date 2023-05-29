import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addGoal,
  deleteGoal,
  editGoal,
  getGoals,
} from '../actions-reducers/goals';
import { addHabit, getHabits } from '../actions-reducers/habits';
import { logout } from '../actions-reducers/logout';
import { getCurrentUser } from '../actions-reducers/users';
import { ReactComponent as LoginHumanSVG } from '../assets/illustrations/login-humaaan.svg';
import Banner from '../components/Banner';
import FormsOverlay from '../components/FormOverlay';
import GoalCard from '../components/GoalCard/GoalCard';
import IconButton from '../components/IconButton';
import SmallCard from '../components/SmallCard';
import Button from '../core-components/Button';
import Div from '../core-components/Div';
import Heading from '../core-components/Heading';
import GoalForm from '../forms/GoalForm';
import HabitForm from '../forms/HabitForm';
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
    goalsForm,
    habitForm,
  } = content;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = localStorage.getItem(localStorageJwtKey);
  const userId = userToken && extractUserId(userToken);

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

  const fullState = useSelector((state) => state);
  const { user, goals } = fullState;

  const stateEntities = Object.keys(fullState);
  const errors = stateEntities
    .map((entity) => {
      const error = fullState[entity].error;
      let message = '';
      if (error && error.message) {
        message = error.message;
      }
      return message;
    })
    .filter((error) => error !== '');

  const goalsList = goals.items;
  const goalsListLen = goalsList && goalsList.length;

  const showAddGoalBtn = goalsListLen > 0 && goalsListLen < 3;
  const hasMaxGoalsNum = goalsListLen === 3;

  const [goalFormIsVisible, setGoalFormVisibility] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedGoal, setEditedGoal] = useState(null);

  const [habitFormIsVisible, setHabitFormVisibility] = useState(false);
  const [habitGoalId, setHabitGoalId] = useState('');

  const handleCloseOverlay = (formName) => {
    if (formName === 'goal') {
      setGoalFormVisibility(false);
    }

    if (formName === 'habit') {
      setHabitFormVisibility(false);
    }
  };

  const handleAddGoal = (goal) => {
    dispatch(addGoal({ userId, userToken, goal }));
  };

  const handleEditGoal = (updatedGoal, goalId) => {
    dispatch(editGoal({ userId, userToken, goalId, updatedGoal }));
  };

  const handleDeleteGoal = (e, goalId) => {
    e.preventDefault();
    dispatch(deleteGoal({ userId, userToken, goalId }));
  };

  const handleEdit = (e, goal) => {
    e.preventDefault();
    setIsEditMode(true);
    setEditedGoal(goal);
    setGoalFormVisibility(true);
  };

  const handleAddHabit = (habit, goalId) => {
    dispatch(addHabit({ userId, userToken, goalId, habit }));
    setHabitGoalId('');
  };

  const handleHabitFormOverlay = (goalId) => {
    setHabitFormVisibility(true);
    setHabitGoalId(goalId);
  };

  const handleGetHabits = (goalId) => {
    dispatch(getHabits({ userId, userToken, goalId }));
  };

  return (
    <Div
      display="flex"
      flexDirection={['column', 'column', 'column', 'column', 'row']}
      width="100%"
    >
      {goalFormIsVisible && (
        <FormsOverlay closeHandler={() => handleCloseOverlay('goal')}>
          <GoalForm
            content={goalsForm}
            handleSubmit={isEditMode ? handleEditGoal : handleAddGoal}
            handleCloseOverlay={() => handleCloseOverlay('goal')}
            goal={isEditMode ? editedGoal : null}
          />
        </FormsOverlay>
      )}

      {habitFormIsVisible && (
        <FormsOverlay closeHandler={() => handleCloseOverlay('habit')}>
          <HabitForm
            content={habitForm}
            handleCloseOverlay={() => handleCloseOverlay('habit')}
            handleSubmit={handleAddHabit}
            goalId={habitGoalId}
          />
        </FormsOverlay>
      )}

      <Div
        bg="primary"
        minHeight={['auto', 'auto', 'auto', 'auto', '100vh']}
        px={6}
        py={3}
        width={['auto', 'auto', 'auto', 'auto', '25%']}
      >
        <Div
          mt={[3, 3, 3, 3, 10]}
          mb={[3, 3, 3, 3, 0]}
          display="flex"
          alignItems="center"
          justifyContent={[
            'space-between',
            'space-between',
            'space-between',
            'space-between',
            'center',
          ]}
        >
          <Heading color="#fff">
            {greeting}
            {user.firstName}
          </Heading>
          <Div
            alignSelf="flex-end"
            display={['block', 'block', 'block', 'block', 'none']}
          >
            <Button
              variant="secondaryMd"
              onClick={(e) => {
                e.preventDefault();
                dispatch(logout());
                navigate('/login');
              }}
            >
              {logoutBtn}
            </Button>
          </Div>
        </Div>

        <SmallCard mt={(2, 2, 4, 4, 6)} height={100}>
          Filters placeholder
        </SmallCard>
        <Div
          display={['none', 'none', 'none', 'none', 'flex']}
          justifyContent="center"
          alignItems="center"
        >
          <LoginHumanSVG width={350} height={250} />
        </Div>
      </Div>

      <Div
        display="flex"
        flexDirection="column"
        alignItems="center"
        alignContent="center"
        width={['auto', 'auto', 'auto', 'auto', '75%']}
      >
        <Div
          alignSelf="flex-end"
          display={['none', 'none', 'none', 'none', 'block']}
        >
          <Button
            variant="secondaryMd"
            my={6}
            mx={[4, 4, 6, 6, 8]}
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
          width={['90%', '90%', '90%', '90%', '80%']}
        >
          {goalsListLen === 0 ? (
            <>
              {user && user.firstName && (
                <Heading
                  mt={[4, 4, 6, 6, 2]}
                  mb={1}
                  textAlign={['center', 'center', 'center', 'left', 'left']}
                >
                  {noGoalsIntro}
                </Heading>
              )}

              <GoalForm content={goalsForm} handleSubmit={handleAddGoal} />
            </>
          ) : (
            <Div
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={2}
              mt={[4, 4, 4, 4, 2]}
            >
              <Heading mb={[1, 1, 2, 2, 2]}>{goalsIntro}</Heading>

              {errors.map((error, i) => (
                <Banner
                  key={i}
                  color="error"
                  bg="white"
                  fontSize={3}
                  iconName="caution"
                  iconStroke="#922B21"
                  mt={4}
                >
                  {error}
                </Banner>
              ))}
            </Div>
          )}

          {goalsListLen > 0 && (
            <Div display="flex" flexDirection="column" width="100%">
              {hasMaxGoalsNum && (
                <Banner
                  iconName="tips"
                  mt={[0, 0, 2, 2, 2]}
                  mb={[4, 4, 4, 6, 6]}
                >
                  {maxNumOfGoalsInfo}
                </Banner>
              )}
              {goalsList.map((goal, i) => {
                const goalId = goal.id;
                return (
                  <GoalCard
                    key={i}
                    goal={goal}
                    goalCardText={goalCard}
                    handleDelete={(e) => handleDeleteGoal(e, goalId)}
                    handleEdit={(e) => handleEdit(e, goal)}
                    handleHabitFormOverlay={() =>
                      handleHabitFormOverlay(goalId)
                    }
                    handleGetHabits={() => handleGetHabits(goalId)}
                  />
                );
              })}
            </Div>
          )}

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
