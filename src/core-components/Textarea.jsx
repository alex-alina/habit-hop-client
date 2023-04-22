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

const CoreTextarea = styled('textarea')(
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

const StyledCoreTextArea = styled(CoreTextarea)`
  border-color: ${(props) => props.theme.colors.input.border};
  &:active {
    border-color: ${(props) => props.theme.colors.input.border};
  }
  ::placeholder {
    color: ${(props) => props.theme.colors.placeholder};
    font-family: ${(props) => props.theme.fonts.body};
    font-size: ${(props) => props.theme.fontSizes[1]};
  }
  &&:focus,
  &&:focus-visible {
    border-color: ${(props) => props.theme.colors.input.focus};
    outline: none;
  }
  &:hover {
    border-color: ${(props) => props.theme.colors.input.hover};
  }
`;

const Textarea = ({ children, field, ...props }) => {
  return (
    <StyledCoreTextArea
      color="text"
      fontFamily="body"
      fontSize={3}
      borderWidth="2px"
      borderStyle="solid"
      py={2}
      px={2}
      mb={2}
      borderRadius={1}
      {...field}
      {...props}
    >
      {children}
    </StyledCoreTextArea>
  );
};

export default Textarea;
