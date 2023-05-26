import React from 'react';
import Div from '../core-components/Div';

const SmallCard = ({ children, ...props }) => {
  return (
    <Div
      bg="#fff"
      borderRadius={1}
      border="2px solid"
      borderColor="cardBorder"
      p={2}
      {...props}
    >
      {children}
    </Div>
  );
};

export default SmallCard;
