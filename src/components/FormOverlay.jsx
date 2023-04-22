import React from 'react';
import SvgIcon from './SvgIcon';
import Button from '../core-components/Button';
import Div from '../core-components/Div';
import { ReactComponent as PlantTwo } from '../assets/illustrations/Humaaans - Plant 2.svg';

const PlantDeco = (props) => {
  return (
    <Div
      display={['none', 'none', 'none', 'none', 'block']}
      alignSelf="flex-end"
      {...props}
    >
      <PlantTwo width={300} height={500} />
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
      height="100%"
      minHeight="100%"
      zIndex={5}
      bg="blue.0"
      position="absolute"
      top="0"
      left="0"
      bottom="0"
    >
      <Button
        aria-label="Close overlay"
        variant="roundButtonLg"
        alignItems="center"
        flexDirection="column"
        alignSelf="flex-end"
        width={40}
        height={40}
        mr={[4, 4, 4, 6, 6]}
        mt={4}
        onClick={closeHandler}
      >
        <SvgIcon name="close" role="graphics-symbol" aria-hidden="true" />
      </Button>
      <Div display="flex" justifyContent="center" mt={[4, 4, 7, 7, 8]}>
        <PlantDeco pr={8} />
        {children}
        <PlantDeco pl={8} />
      </Div>
    </Div>
  );
};

export default FormsOverlay;
