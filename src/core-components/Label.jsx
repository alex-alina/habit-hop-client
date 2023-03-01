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

const CoreLabel = styled('label')(
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

const Label = ({ children, ...props }) => {
  return (
    <CoreLabel color="label" fontSize={4} fontFamily="body" mb={2} {...props}>
      {children}
    </CoreLabel>
  );
};

export default Label;
