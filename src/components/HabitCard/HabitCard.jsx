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

const HabitCard = ({ content, habit, handleDelete, handleEdit, ...props }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showEntries, setShowEntries] = useState(false);
  const {
    settingsBtn,
    editBtn,
    deleteBtn,
    newEntryBtn,
    showEntriesBtn,
    hideEntriesBtn,
    developIcon,
    breakIcon,
  } = content;

  const { habitDescription, habitType, id } = habit;
  const iconName = habitType === 'develop' ? developIcon : breakIcon;
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
          {settingsBtn}
        </IconButton>

        <IconButton
          // clickHandler={handleAddEntry}
          iconName="add-one"
          iconColor="#fff"
          variant="primarySm"
          width={150}
        >
          {newEntryBtn}
        </IconButton>
      </Div>
      {showSettings && (
        <SmallCard
          display="flex"
          justifyContent="flex-start"
          py={4}
          mt={[3, 3, 3, 4, 4]}
        >
          <IconButton
            clickHandler={(e) => {
              handleEdit(e, habit);
              setShowSettings(false);
            }}
            iconName="write"
            mr={8}
            variant="secondarySm"
            width={150}
          >
            {editBtn}
          </IconButton>

          <IconButton
            clickHandler={(e) => {
              handleDelete(e, id);
              setShowSettings(false);
            }}
            iconName="delete"
            iconColor="#922B21"
            variant="secondaryDangerSm"
            width={150}
          >
            {deleteBtn}
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
        {showEntries ? hideEntriesBtn : showEntriesBtn}
      </IconButton>
    </Div>
  );
};

export default HabitCard;
