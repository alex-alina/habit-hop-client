import React, { useState, useEffect } from 'react';
import IconButton from '../components/IconButton';
import Div from '../core-components/Div';
import Header from '../core-components/Heading';
import Paragraph from '../core-components/Paragraph';
import Span from '../core-components/Span';
import { capitalizeFirstChar } from '../utils/format';
import { useSelector } from 'react-redux';

const GoalCard = ({
  goal,
  goalCardText,
  handleDelete,
  handleEdit,
  handleHabitFormOverlay,
  handleGetHabits,
  ...props
}) => {
  const {
    editBtn,
    deleteBtn,
    timeSection,
    addHabitBtn,
    showHabitsBtn,
    hideHabitsBtn,
  } = goalCardText;

  const goalPriority = capitalizeFirstChar(goal.priority);
  const [areHabitsVisible, setAreHabitsVisible] = useState(false);
  const goalId = goal.id;

  useEffect(() => {
    handleGetHabits(goalId);
  }, []);

  const habits = useSelector((state) => state.habits.items);
  const ownHabits = habits && habits[goalId];

  // const habitsLen = habits && habits.length;
  const developHabits =
    ownHabits &&
    ownHabits.filter((habit) => {
      if (habit.habitType === 'develop') {
        return habit;
      }
    });
  const breakHabits =
    ownHabits &&
    ownHabits.filter((habit) => {
      if (habit.habitType === 'break') {
        return habit;
      }
    });

  return (
    <Div
      width={['90%', '90%', '90%', '90%', '70%']}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      mb={5}
      mx={0}
      bg="white"
      borderRadius={1}
      borderWidth="2px"
      borderStyle="solid"
      borderColor="blue.1"
      px={[4, 4, 4, 6, 6]}
      pt={4}
      {...props}
    >
      <Div display="flex" justifyContent="space-between" mb={4}>
        <IconButton
          clickHandler={handleEdit}
          iconName="write"
          variant="secondarySm"
          width={120}
        >
          {editBtn}
        </IconButton>
        <IconButton
          clickHandler={handleDelete}
          iconName="delete"
          iconColor="#922B21"
          variant="secondaryDangerSm"
          width={120}
        >
          {deleteBtn}
        </IconButton>
      </Div>

      <Div
        display="flex"
        flexDirection={['column', 'column', 'column', 'row', 'row']}
        justifyContent="space-between"
        borderTop="2px solid #C5CAE9"
        borderBottom="2px solid #C5CAE9"
        py={[3, 3, 3, 4, 4]}
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
            {timeSection.title}
          </Header>
          <Paragraph mb={1}>
            <Span color="heading">{timeSection.startLabel}</Span>
            {goal.startDate}
          </Paragraph>
          <Paragraph>
            <Span color="heading">{timeSection.endLabel}</Span>
            {goal.endDate}
          </Paragraph>
        </Div>
      </Div>

      <Div display="flex" justifyContent="space-between" py={3}>
        <IconButton
          variant="primarySm"
          iconName="add-one"
          iconColor="#fff"
          clickHandler={handleHabitFormOverlay}
          maxWidth={150}
        >
          {addHabitBtn}
        </IconButton>
        <IconButton
          variant="primarySm"
          iconName={areHabitsVisible ? 'up-c' : 'down-c'}
          iconColor="#fff"
          onClick={() => {
            setAreHabitsVisible(!areHabitsVisible);
          }}
        >
          {areHabitsVisible ? hideHabitsBtn : showHabitsBtn}
        </IconButton>
      </Div>

      {areHabitsVisible && (
        <Div
          my={2}
          p={3}
          display="flex"
          justifyContent="space-between"
          width="100%"
          bg="turquoise.0"
        >
          {developHabits && (
            <Div width="40%" bg="orange.2">
              {developHabits.map((habit, i) => (
                <Div key={i}>{habit.habitDescription}</Div>
              ))}
            </Div>
          )}
          {breakHabits && (
            <Div width="40%" bg="green.2">
              {breakHabits.map((habit, i) => (
                <Div key={i}>{habit.habitDescription}</Div>
              ))}
            </Div>
          )}
        </Div>
      )}
    </Div>
  );
};

export default GoalCard;
