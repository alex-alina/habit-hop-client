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

const CoreParagraph = styled('p')(
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

const Paragraph = ({ children, ...props }) => {
  return (
    <CoreParagraph fontFamily="body" m={0} fontSize={2} {...props}>
      {children}
    </CoreParagraph>
  );
};

export default Paragraph;
