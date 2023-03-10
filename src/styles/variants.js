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
export const iconButton = {
  ...baseButton,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '100%',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  bg: 'transparent',
  py: 1,
  px: 1,
};

export const roundButton = {
  ...baseButton,
  borderRadius: '100%',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: '#3949AB',
  bg: 'white',
  py: 1,
  px: 1,
};

export const roundButtonLg = {
  ...roundButton,
  width: 50,
  height: 50,
  py: 2,
  px: 2,
};

export const buttonSizes = {
  large: {
    fontSize: 4,
    lineHeight: 1,
    width: [200, 200, 200, 250, 250],
  },
  medium: {
    fontSize: 3,
    lineHeight: 0,
  },
  small: {
    fontSize: 2,
    lineHeight: 0,
    py: 1,
    borderWidth: '1px',
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
  border: '2px solid #1A237E',
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

export const secondaryDanger = {
  ...baseButton,
  color: '#922B21',
  bg: 'white',
  border: '2px solid #922B21',
  '&:hover': {
    bg: '#F9EBEA',
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
  secondaryDangerLg: {
    ...secondaryDanger,
    ...buttonSizes.large,
  },
  secondaryDangerMd: {
    ...secondaryDanger,
    ...buttonSizes.medium,
  },
  secondaryDangerSm: {
    ...secondaryDanger,
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
  roundButton,
  roundButtonLg,
  iconButton,
};
