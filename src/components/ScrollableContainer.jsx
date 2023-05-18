import React from 'react';
import styled from 'styled-components';
import Div from '../core-components/Div';

const StyledDiv = styled(Div)`
  /* Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
`;

const ScrollableContainer = (props) => {
  return <StyledDiv overflow="auto" {...props} />;
};

export default ScrollableContainer;
