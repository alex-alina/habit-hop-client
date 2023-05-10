import { CoreInput } from '../core-components/Input';
import styled from 'styled-components';

const StyledRadio = styled(CoreInput)`
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  margin: ${({ theme }) => theme.space[1]};
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.disabled};
  background-color: ${({ theme }) => theme.colors.disabled};

  &:checked {
    background-color: ${({ theme }) => theme.colors.active};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.active};
  }

  &:active,
  &&:focus,
  &&:focus-visible,
  &:hover {
    background-color: ${({ theme }) => theme.colors.active};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.active};
    transition: all 300ms ease-in-out;
  }
`;

const Radio = ({ field, ...props }) => {
  return (
    <StyledRadio
      type="radio"
      height="18px"
      width="18px"
      {...field}
      {...props}
    />
  );
};

export default Radio;
