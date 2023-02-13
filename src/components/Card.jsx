import Div from '../core-components/Div';
import React from 'react';

const Card = ({ children, ...restProps }) => {
  return (
    <Div
      borderColor="blue.5"
      borderStyle="solid"
      borderWidth="1px"
      borderRadius={1}
      p={5}
      {...restProps}
    >
      {children}
    </Div>
  );
};

export default Card;
