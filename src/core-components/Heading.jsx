import styled from 'styled-components';
import {
  background,
  border,
  color,
  display,
  flexbox,
  layout,
  position,
  space,
  shadow,
  textAlign,
  typography,
} from 'styled-system';

const CoreHeading = styled('h1')(
  background,
  border,
  color,
  display,
  flexbox,
  layout,
  position,
  space,
  shadow,
  textAlign,
  typography
);

const Heading = ({ children, ...props }) => {
  return (
    <CoreHeading
      color="heading"
      fontFamily="heading"
      fontWeight={1}
      m={0}
      {...props}
    >
      {children}
    </CoreHeading>
  );
};

export default Heading;
