import React from 'react';
import Div from '../../core-components/Div';
import Paragraph from '../../core-components/Paragraph';
import SvgIcon from '../SvgIcon';
import SmallCard from '../SmallCard';

const Title = ({ iconColor, textColor, children }) => {
  return (
    <Div display="flex" alignItems="center" mb={3}>
      <SvgIcon
        role="graphics-symbol"
        name="check-one"
        aria-hidden="true"
        stroke={iconColor}
        width={20}
        height={20}
      />
      <Paragraph fontSize={4} color={textColor} ml={1}>
        {children}
      </Paragraph>
    </Div>
  );
};

const HabitsSection = ({ content, habits, ...props }) => {
  const { developSection, breakSection } = content;

  const developHabits =
    habits &&
    habits.filter((habit) => {
      if (habit.habitType === 'develop') {
        return habit;
      }
    });
  const breakHabits =
    habits &&
    habits.filter((habit) => {
      if (habit.habitType === 'break') {
        return habit;
      }
    });

  return (
    <Div
      display="flex"
      flexDirection={['column', 'column', 'row', 'row', 'row']}
      justifyContent="space-between"
      width="100%"
      borderTop="2px solid"
      borderTopColor="divider"
      pt={[3, 3, 3, 4, 4]}
      {...props}
    >
      {developHabits && developHabits.length > 0 && (
        <Div width={['100%', '100%', '48%', '48%', '48%']} px={1}>
          <Title iconColor="#1D8348" textColor="success">
            {developSection.title}
          </Title>

          {developHabits.map((habit, i) => (
            <SmallCard key={i} mb={2}>
              {habit.habitDescription}
            </SmallCard>
          ))}
        </Div>
      )}
      {breakHabits && breakHabits.length > 0 && (
        <Div width={['100%', '100%', '48%', '48%', '48%']} px={1}>
          <Title iconColor="#922B21" textColor="error">
            {breakSection.title}
          </Title>

          {breakHabits.map((habit, i) => (
            <SmallCard key={i} mb={2}>
              {habit.habitDescription}
            </SmallCard>
          ))}
        </Div>
      )}
    </Div>
  );
};

export default HabitsSection;
