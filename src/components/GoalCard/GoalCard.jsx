import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Div from '../../core-components/Div';
import Heading from '../../core-components/Heading';
import Paragraph from '../../core-components/Paragraph';
import Span from '../../core-components/Span';
import { capitalizeFirstChar } from '../../utils/format';
import IconButton from '../IconButton';
import IconButtonLink from '../IconButtonLink';
import HabitsSection from './HabitsSection';

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
    habitsOverviewLink,
    addHabitBtn,
    showHabitsBtn,
    hideHabitsBtn,
    habitsContainer,
  } = goalCardText;
  const goalPriority = capitalizeFirstChar(goal.priority);
  const [areHabitsVisible, setAreHabitsVisible] = useState(false);
  const goalId = goal.id;

  useEffect(() => {
    handleGetHabits(goalId);
  }, []);

  const habits = useSelector((state) => state.habits.items);
  const ownHabits = habits && habits[goalId];
  const borderStyle = '2px solid';

  return (
    <Div
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      mb={5}
      mx={0}
      bg="white"
      borderRadius={1}
      border={borderStyle}
      borderColor="cardBorder"
      px={[4, 4, 4, 6, 6]}
      py={4}
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
        flexDirection="column"
        borderBottom={borderStyle}
        borderBottomColor="divider"
        pb={[3, 3, 3, 4, 4]}
      >
        <Div
          display="flex"
          flexDirection={['column', 'column', 'column', 'row', 'row']}
          justifyContent="space-between"
          borderTop={borderStyle}
          borderTopColor="divider"
          py={[3, 3, 3, 4, 4]}
        >
          <Div
            display="flex"
            flexDirection="column"
            width={['90%', '90%', '90%', '40%', '40%']}
          >
            <Heading as="h3" fontSize={4}>
              {goalPriority} goal
            </Heading>
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
            <Heading as="h3" fontSize={4} mb={1}>
              {timeSection.title}
            </Heading>
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
        <Div alignSelf="center">
          <Link
            to={`/habits/${goalId}`}
            style={{
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <IconButtonLink
              aria-label="Go to habits overview"
              iconName="arrow-right"
            >
              {habitsOverviewLink}
            </IconButtonLink>
          </Link>
        </Div>
      </Div>

      <Div display="flex" justifyContent="space-between" pt={[3, 3, 3, 4, 4]}>
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
        <HabitsSection
          content={habitsContainer}
          habits={ownHabits}
          mt={[3, 3, 3, 4, 4]}
        />
      )}
    </Div>
  );
};

export default GoalCard;
