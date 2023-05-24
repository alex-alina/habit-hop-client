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

const CoreLegend = styled('legend')(
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

const Legend = ({ children, ...props }) => {
  return (
    <CoreLegend color="label" fontSize={4} fontFamily="body" mb={2} {...props}>
      {children}
    </CoreLegend>
  );
};

export default Legend;
