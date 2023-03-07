import React, { useEffect } from 'react';
import Div from '../core-components/Div';
import Header from '../core-components/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../actions-reducers/users';
import { getGoals } from '../actions-reducers/goals';
import { goalsScreen } from '../text/text';
import Button from '../core-components/Button';
import { ReactComponent as GoalsOverviewImg } from '../assets/illustrations/GoalsOverview.svg';
import Paragraph from '../core-components/Paragraph';
import { parseDateToDDMonthYYYY } from '../utils/date';
import { capitalizeWord } from '../utils/format';
import Span from '../core-components/Span';
import SvgIcon from '../components/SvgIcon';

const { greeting, logoutBtn, goalsIntro, noGoalsIntro } = goalsScreen;

const Goals = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.login.userId);
  const userToken = useSelector((state) => state.login.userJwt);
  const user = useSelector((state) => state.user);
  const goals = useSelector((state) => state.goals.items);
  console.log(goals);

  useEffect(() => {
    if (userId && userToken) {
      dispatch(getCurrentUser({ userId, userToken }));
      dispatch(getGoals({ userId, userToken }));
    }
  }, [userId, userToken]);

  return (
    <Div
      alignItems="center"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      width="100%"
    >
      <Div
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={6}
        bg="blue.0"
        fontStyle="italic"
      >
        <Header as="h2" fontSize={6} my={2} mx={[2, 2, 2, 2, 8]}>
          {greeting}
          {user.firstName}
        </Header>
        <Button
          variant="secondaryMd"
          mt={4}
          my={2}
          mx={[2, 2, 2, 2, 8]}
          onClick={(e) => {
            e.preventDefault();
            //  dispatch(logout action)
          }}
        >
          {logoutBtn}
        </Button>

        {/* {logoutStatus === 'success' ? <Navigate replace to="/login" /> : null} */}
      </Div>
      <Div display="flex" justifyContent="flex-start" width="100%">
        <Div
          display={['none', 'none', 'none', 'none', 'flex']}
          alignItems="center"
          justify-content="space-around"
          width="30%"
          px={9}
        >
          <GoalsOverviewImg width="100%" height="100%" />
        </Div>
        <Div
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          pl={[0, 0, 0, 0, 6]}
          mx="auto"
          width={['90%', '90%', '80%', '80%', '60%']}
        >
          {goals && goals.length === 0 ? (
            <Header>{noGoalsIntro}</Header>
          ) : (
            <Header mb={4}>{goalsIntro}</Header>
          )}
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
                    borderRadius={1}
                    borderWidth="2px"
                    borderStyle="solid"
                    borderColor="blue.1"
                    px={4}
                    pt={4}
                    pb={2}
                  >
                    <Div display="flex" justifyContent="space-between">
                      <Span display="flex">
                        {/* <Header as="h3" fontSize={5} mt={1}>
                          {goalPriority}
                        </Header> */}
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
        </Div>
      </Div>
    </Div>
  );
};

export default Goals;
