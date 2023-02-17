import baseColors from './colors';

const colors = {
  ...baseColors,
  background: '',
  heading: baseColors.blue[9],
  text: baseColors.blue[9],
  lightText: '',
  divider: '',
  placeholder: '',
  disabled: '',
  primary: '',
  secondary: '',
  tertiary: '',
  info: '',
  advice: '',
  alert: '',
  danger: baseColors.red[5],
  error: baseColors.red[7],
  success: '',
  warning: baseColors.orange[5],
};

const baseSize = 16;
const breakpointsPx = ['360', '425', '768', '1240', '1440'];
export const breakpoints = breakpointsPx.map((px) => `${px / baseSize}em`);
//360 375 768 1024 1440 1920
export const fonts = {
  body: 'Roboto, sans-serif;',
  button: 'Nunito, sans-serif;',
  heading: 'Nunito, sans-serif;',
};

export const fontSizes = [12, 14, 16, 18, 20, 24, 32, 40, 48, 56].map(
  (px) => `${px ? px / baseSize : 0}em`
);
//fontSizes
// 12: 0
// 14: 1
// 16: 2
// 18: 3
// 20: 4
// 24: 5
// 32: 6
// 40: 7
// 48: 8
// 56: 9

export const fontWeights = [400, 500, 700];

export const lineHeights = ['1.2', '1.4', '1.5'];

export const radii = [0, 8, 16, 24, 32, 50, 100];

export const shadows = {
  1: {
    boxShadow: `0px 5px 18px rgba(40, 41, 61, 0.07);`,
  },
  2: {
    boxShadow: `0px 4px 22px rgba(0, 0, 0, 0.06);`,
  },
  3: {
    boxShadow: `0px 7px 20px rgba(40, 41, 61, 0.08);`,
  },
  4: {
    boxShadow: `0px 4px 23px rgba(0, 0, 0, 0.12);`,
  },
  5: {
    boxShadow: `0px 2px 4px rgba(40, 41, 61, 0.04), 0px 8px 16px rgba(96, 97, 112, 0.16);`,
  },
  6: {
    boxShadow: `1px 5px 22px 4px rgba(0, 0, 0, 0.15);`,
  },
  7: {
    boxShadow: `1px 5px 22px 4px rgba(0, 0, 0, 0.15);`,
  },
  8: {
    boxShadow: `0px 2px 8px rgba(40, 41, 61, 0.08), 0px 20px 32px rgba(96, 97, 112, 0.24);`,
  },
};
//Shaddows: 1-Form, 2-Medium, 3-Card, 4-Regular, 5-Base, 6-Huge, 7-Large, 8-Badge

export const space = [0, 4, 8, 12, 16, 24, 32, 40, 48, 56].map(
  (px) => `${px ? px / baseSize : 0}em`
);

//Spaces
//0: 0
//4: 1
//8: 2
//12: 3
//16: 4
//24: 5
//32: 6
//40: 7
//48: 8
//56: 9
export const zIndices = {};

const defaultTheme = {
  colors,
  breakpoints,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  shadows,
  space,
  zIndices,
};

export default defaultTheme;
