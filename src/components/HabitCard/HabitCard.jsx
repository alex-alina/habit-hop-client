import React, { useState } from 'react';
import IconButton from '../../components/IconButton';
import SmallCard from '../../components/SmallCard';
import SvgIcon from '../../components/SvgIcon';
import Div from '../../core-components/Div';
import Paragraph from '../../core-components/Paragraph';

const HabitDescription = ({ iconColor, iconName, textColor, children }) => {
  return (
    <SmallCard
      display="flex"
      alignItems="flex-start"
      my={[3, 3, 3, 4, 4]}
      p={[3, 3, 3, 4, 4]}
    >
      <SvgIcon
        aria-hidden="true"
        role="graphics-symbol"
        name={iconName}
        stroke={iconColor}
        width={20}
        height={20}
        minWidth={20}
      />
      <Paragraph fontSize={4} color={textColor} ml={1}>
        {children}
      </Paragraph>
    </SmallCard>
  );
};

const HabitCard = ({ habit, ...props }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showEntries, setShowEntries] = useState(false);

  const { habitDescription, habitType } = habit;
  const iconName = habitType === 'develop' ? 'check-one' : 'close-one';
  const iconColour = habitType === 'develop' ? '#1D8348' : '#922B21';

  return (
    <Div
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      bg="white"
      border="2px solid"
      borderColor="cardBorder"
      borderRadius={1}
      mb={5}
      mx={0}
      pb={2}
      pt={4}
      px={[4, 4, 4, 6, 6]}
      width={['90%', '90%', '90%', '90%', '70%']}
      {...props}
    >
      <Div display="flex" justifyContent="space-between">
        <IconButton
          clickHandler={() => setShowSettings(!showSettings)}
          iconColor="#fff"
          iconName={showSettings ? 'up-c' : 'down-c'}
          justifyContent="space-around"
          variant="primarySm"
          width={150}
        >
          Settings
        </IconButton>

        <IconButton
          // clickHandler={handleDelete}
          iconName="add-one"
          iconColor="#fff"
          variant="primarySm"
          width={150}
        >
          New Entry
        </IconButton>
      </Div>
      {showSettings && (
        <SmallCard
          display="flex"
          justifyContent="flex-start"
          // borderColor="primary"
          // mb={2}
          py={4}
          mt={[3, 3, 3, 4, 4]}
        >
          <IconButton
            // clickHandler={handleEdit}
            iconName="write"
            mr={8}
            variant="secondarySm"
            width={150}
          >
            Edit
          </IconButton>

          <IconButton
            // clickHandler={handleDelete}
            iconName="delete"
            iconColor="#922B21"
            variant="secondaryDangerSm"
            width={150}
          >
            Delete
          </IconButton>
        </SmallCard>
      )}
      <HabitDescription iconColor={iconColour} iconName={iconName}>
        {habitDescription}
      </HabitDescription>
      {showEntries && (
        <Div height={300} bg="blue.0" p={4} mb={3}>
          Entries container placeholder
        </Div>
      )}
      <IconButton
        alignSelf="center"
        clickHandler={() => setShowEntries(!showEntries)}
        iconName={showEntries ? 'up-c' : 'down-c'}
        variant="secondarySm"
        width={170}
      >
        {showEntries ? `Hide entries` : `Show entries`}
      </IconButton>
    </Div>
  );
};

export default HabitCard;
