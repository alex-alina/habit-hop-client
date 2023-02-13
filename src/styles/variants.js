export const baseButton = {
  cursor: 'pointer',
  fontFamily: 'button',
  fontSize: 4,
  fontWeight: 2,
  appearance: 'none',
  border: 'none',
  borderRadius: 3,
  py: 2,
  px: 4,
  '&:active': {
    transform: 'scale(0.99)',
  },
};

export const buttonSizes = {
  large: {
    fontSize: 4,
    lineHeight: 1,
  },
  medium: {
    fontSize: 3,
    lineHeight: 0,
  },
  small: {
    fontSize: 2,
    lineHeight: 0,
  },
};

export const disabled = {
  color: '#AEB6BF',
  border: '2px solid #AEB6BF',
  bg: 'white',
};

export const primary = {
  ...baseButton,
  color: '#ffffff',
  bg: '#1A237E',
  '&:hover': {
    bg: '#303F9F',
  },
  '&:disabled': {
    opacity: 0.3,
  },
};

export const secondary = {
  ...baseButton,
  color: '#1A237E',
  bg: 'white',
  border: '2px solid #3949AB',
  '&:hover': {
    bg: '#E8EAF6',
  },
  '&:disabled': {
    ...disabled,
  },
};

export const tertiary = {
  ...baseButton,
  color: '#1A237E',
  bg: '#E8EAF6',
  border: '2px solid #C5CAE9',
  '&:hover': {
    bg: 'white',
  },
  '&:disabled': {
    ...disabled,
  },
};

export const buttons = {
  primaryLg: {
    ...primary,
    ...buttonSizes.large,
  },
  primaryMd: {
    ...primary,
    ...buttonSizes.medium,
  },
  primarySm: {
    ...primary,
    ...buttonSizes.small,
  },
  secondaryLg: {
    ...secondary,
    ...buttonSizes.large,
  },
  secondaryMd: {
    ...secondary,
    ...buttonSizes.medium,
  },
  secondarySm: {
    ...secondary,
    ...buttonSizes.small,
  },
  tertiaryLg: {
    ...tertiary,
    ...buttonSizes.large,
  },
  tertiaryMd: {
    ...tertiary,
    ...buttonSizes.medium,
  },
  tertiarySm: {
    ...tertiary,
    ...buttonSizes.small,
  },
};
