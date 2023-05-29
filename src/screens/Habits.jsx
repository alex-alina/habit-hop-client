import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addHabit, deleteHabit } from '../actions-reducers/habits';
import { logout } from '../actions-reducers/logout';
import { ReactComponent as DataIllustration } from '../assets/illustrations/Data.svg';
import { ReactComponent as Plant } from '../assets/illustrations/Humaaans - Plant 2.svg';
import FormsOverlay from '../components/FormOverlay';
import HabitCard from '../components/HabitCard/HabitCard';
import IconButton from '../components/IconButton';
import SmallCard from '../components/SmallCard';
import SvgIcon from '../components/SvgIcon';
import Button from '../core-components/Button';
import Div from '../core-components/Div';
import Heading from '../core-components/Heading';
import HabitForm from '../forms/HabitForm';
import { goalsScreen, habitsScreen } from '../text/text';
import { localStorageJwtKey } from '../utils/constants';
import { extractUserId, isExpired } from '../utils/jwt';

const habitFormContent = goalsScreen.habitForm;

const Habits = ({ content = habitsScreen }) => {
  const { logoutBtn, intro, noHabitsIntro, addHabitBtn, habitCard } = content;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let params = useParams();

  const userToken = localStorage.getItem(localStorageJwtKey);
  const userId = userToken && extractUserId(userToken);
  const goalId = params.goalId;

  const goals = useSelector((state) => state.goals.items) || [];
  const goal = goals.filter((goal) => {
    if (goal.id === goalId) return goal;
  })[0];
  const goalDefinition = goal && goal.goalDefinition;

  const habits = useSelector((state) => state.habits.items[goalId]);
  const habitsLen = habits && habits.length;
  const showAddHabitBtn = habitsLen > 0 && habitsLen < 4;

  useEffect(() => {
    // if (userId && userToken) {
    //   dispatch(getHabits({ userId, userToken, goalId }));
    //   // dispatch(getCurrentUser({ userId, userToken }));
    //   // dispatch(getGoals({ userId, userToken }));
    // }
    if (!userToken || isExpired(userToken)) {
      dispatch(logout());
      navigate('/login');
    }
  }, [userToken]);

  const [habitFormIsVisible, setHabitFormVisibility] = useState(false);

  const handleCloseOverlay = () => {
    setHabitFormVisibility(false);
  };

  const handleAddHabit = (habit, goalId) => {
    dispatch(addHabit({ userId, userToken, goalId, habit }));
  };

  const handleDeleteHabit = (e, habitId) => {
    e.preventDefault();
    dispatch(deleteHabit({ userId, userToken, goalId, habitId }));
  };

  return (
    <Div
      display="flex"
      flexDirection={['column', 'column', 'column', 'column', 'row']}
      width="100%"
    >
      {habitFormIsVisible && (
        <FormsOverlay closeHandler={() => handleCloseOverlay()}>
          <HabitForm
            content={habitFormContent}
            handleCloseOverlay={() => handleCloseOverlay()}
            handleSubmit={handleAddHabit}
            goalId={goalId}
          />
        </FormsOverlay>
      )}
      <Div
        bg="primary"
        minHeight={['auto', 'auto', 'auto', 'auto', '100vh']}
        px={[6, 6, 6, 8, 8]}
        py={3}
        width={['auto', 'auto', 'auto', 'auto', '25%']}
      >
        <Div
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt={[2, 2, 3, 3, 3]}
        >
          <Link to="/goals">
            <Button
              aria-label="Back to goals page"
              alignItems="center"
              display="flex"
              flexDirection="column"
              height={40}
              variant="roundButtonLg"
              width={40}
            >
              <SvgIcon name="arrow-left" aria-hidden="true" />
            </Button>
          </Link>
          <Button
            display={['block', 'block', 'block', 'block', 'none']}
            onClick={(e) => {
              e.preventDefault();
              dispatch(logout());
              navigate('/login');
            }}
            variant="secondaryMd"
          >
            {logoutBtn}
          </Button>
        </Div>

        <Div display="flex" flexDirection="column" alignItems="center">
          <SmallCard fontSize={4} mt={6} width="100%">
            {goalDefinition}
          </SmallCard>
          <SmallCard
            color="grey.4"
            fontSize={4}
            height={60}
            my={6}
            width="100%"
          >
            Filters container placeholder
          </SmallCard>
          <Div display={['none', 'none', 'none', 'none', 'block']}>
            <DataIllustration />
          </Div>
        </Div>
      </Div>

      <Div p={4} width={['auto', 'auto', 'auto', 'auto', '75%']}>
        <Div
          display={['none', 'none', 'none', 'none', 'flex']}
          justifyContent="flex-end"
          alignItems="center"
          width="100%"
        >
          <Button
            mx={[2, 2, 2, 2, 7]}
            my={2}
            onClick={(e) => {
              e.preventDefault();
              dispatch(logout());
              navigate('/login');
            }}
            variant="secondaryMd"
          >
            {logoutBtn}
          </Button>
        </Div>

        <Div
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading mb={4} mt={3}>
            {intro}
          </Heading>
          {habits && habits.length === 0 && (
            <SmallCard
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={3}
              p={6}
            >
              <Heading as="h2" mb={4}>
                {noHabitsIntro}
              </Heading>
              <Plant width={200} height={200} />
              <IconButton
                variant="primarySm"
                iconName="add-one"
                iconColor="#fff"
                clickHandler={() => setHabitFormVisibility(true)}
                maxWidth={150}
                mt={6}
              >
                {addHabitBtn}
              </IconButton>
            </SmallCard>
          )}

          {habits &&
            habits.length > 0 &&
            habits.map((habit, i) => {
              return (
                <HabitCard
                  content={habitCard}
                  habit={habit}
                  handleDelete={handleDeleteHabit}
                  key={i}
                />
              );
            })}
        </Div>
        {showAddHabitBtn && (
          <IconButton
            mx="auto"
            clickHandler={() => {
              // setIsEditMode(false);
              setHabitFormVisibility(true);
            }}
            iconName="add-one"
            iconColor="#fff"
            variant="primarySm"
            mt={[2, 2, 2, 4, 4]}
            mb={6}
          >
            {addHabitBtn}
          </IconButton>
        )}
      </Div>
    </Div>
  );
};

export default Habits;
