import React from 'react';
import IconButton from '../components/IconButton';
import Button from '../core-components/Button';
import Div from '../core-components/Div';
import Header from '../core-components/Heading';
import Paragraph from '../core-components/Paragraph';
import Span from '../core-components/Span';
import { capitalizeFirstLetter } from '../utils/format';

const GoalCard = ({ goal, goalCardText, handleDelete, handleEdit }) => {
  const { editBtn, deleteBtn, timeSection, showHabitsBtn } = goalCardText;
  const goalPriority = capitalizeFirstLetter(goal.priority);

  return (
    <Div
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
          {editBtn}
        </IconButton>
        <IconButton
          clickHandler={handleDelete}
          iconName="delete"
          stroke="#922B21"
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
      <Button variant="secondarySm" mx="auto" mt={5} maxWidth={150}>
        {showHabitsBtn}
      </Button>
    </Div>
  );
};

export default GoalCard;
