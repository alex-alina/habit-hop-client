import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { logout } from '../actions-reducers/logout';
import { ReactComponent as DataIllustration } from '../assets/illustrations/Data.svg';
import { ReactComponent as Plant } from '../assets/illustrations/Humaaans - Plant 2.svg';
import HabitCard from '../components/HabitCard/HabitCard';
import IconButton from '../components/IconButton';
import SmallCard from '../components/SmallCard';
import SvgIcon from '../components/SvgIcon';
import Button from '../core-components/Button';
import Div from '../core-components/Div';
import Heading from '../core-components/Heading';
import { habitsScreen } from '../text/text';
import { localStorageJwtKey } from '../utils/constants';
import { isExpired } from '../utils/jwt';

const Habits = ({ content = habitsScreen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let params = useParams();
  const goalId = params.goalId;
  const userToken = localStorage.getItem(localStorageJwtKey);
  // const userId = userToken && extractUserId(userToken);
  const { logoutBtn, intro, noHabitsIntro, addHabitBtn, habitCard } = content;

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

  const goals = useSelector((state) => state.goals.items) || [];
  const goal = goals.filter((goal) => {
    if (goal.id === goalId) return goal;
  })[0];

  const goalDefinition = goal && goal.goalDefinition;
  const habits = useSelector((state) => state.habits.items);
  const ownHabits = habits && habits[goalId];

  return (
    <Div
      display="flex"
      flexDirection={['column', 'column', 'column', 'column', 'row']}
    >
      <Div
        bg="primary"
        minHeight="100vh"
        mr={4}
        px={[6, 6, 6, 6, 8]}
        py={3}
        width={['100%', '100%', '100%', '100%', '25%']}
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

      <Div p={4} width={['100%', '100%', '100%', '100%', '75%']}>
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
          {ownHabits && ownHabits.length === 0 && (
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
                // clickHandler={handleHabitFormOverlay}
                maxWidth={150}
                mt={6}
              >
                {addHabitBtn}
              </IconButton>
            </SmallCard>
          )}

          {ownHabits &&
            ownHabits.length > 0 &&
            ownHabits.map((habit, i) => {
              return <HabitCard content={habitCard} habit={habit} key={i} />;
            })}
        </Div>
      </Div>
    </Div>
  );
};

export default Habits;
