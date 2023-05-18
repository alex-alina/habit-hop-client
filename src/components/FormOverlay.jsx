import React from 'react';
import { ReactComponent as PlantTwo } from '../assets/illustrations/Humaaans - Plant 2.svg';
import Button from '../core-components/Button';
import Div from '../core-components/Div';
import ScrollableContainer from './ScrollableContainer';
import SvgIcon from './SvgIcon';

const PlantDeco = (props) => {
  return (
    <Div
      display={['none', 'none', 'none', 'none', 'block']}
      alignSelf="flex-end"
      {...props}
    >
      <PlantTwo width={[300]} height={500} />
    </Div>
  );
};

const FormsOverlay = ({ children, closeHandler }) => {
  return (
    <Div
      role="dialog"
      display="flex"
      flexDirection="column"
      width="100%"
      height="100vh"
      zIndex={5}
      bg="blue.0"
      position="fixed"
      top="0"
    >
      <Button
        aria-label="Close overlay"
        variant="roundButtonLg"
        alignItems="center"
        flexDirection="column"
        alignSelf="flex-end"
        mr={[4, 4, 4, 6, 6]}
        mt={4}
        onClick={closeHandler}
      >
        <SvgIcon name="close" role="graphics-symbol" aria-hidden="true" />
      </Button>
      <ScrollableContainer>
        <Div display="flex" justifyContent="center" mt={[4, 4, 7, 7, 8]}>
          <PlantDeco pr={8} />
          {children}
          <PlantDeco pl={8} />
        </Div>
      </ScrollableContainer>
    </Div>
  );
};

export default FormsOverlay;
