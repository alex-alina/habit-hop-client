import styled from 'styled-components';
import { variant } from 'styled-system';
import { buttons } from '../styles/variants';
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

const Button = styled('button')(
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
  variant({
    variants: {
      ...buttons,
    },
  })
);

export default Button;
