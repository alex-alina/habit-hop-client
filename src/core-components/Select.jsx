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

const CoreSelect = styled('select')(
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

const StyledCoreSelect = styled(CoreSelect)`
  background: white;
  &:-internal-list-box {
    border-radius: 50;
  }
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
  &:after {
    border-radius: '100px';
  }
  option {
    &:first-child {
      background-color: ${(props) => props.theme.colors.disabled};
    }
  }
`;

export const Select = ({ placeholder, options = [], field, ...props }) => {
  return (
    <StyledCoreSelect
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
      <option>{placeholder}</option>
      {options.map((item, i) => {
        return <option key={i}>{item}</option>;
      })}
    </StyledCoreSelect>
  );
};

export default Select;
