import baseColors from './colors';

const colors = {
  ...baseColors,
  background: '',
  heading: baseColors.blue[9],
  text: baseColors.grey[8],
  lightText: baseColors.grey[5],
  label: baseColors.grey[7],
  divider: baseColors.blue[1],
  cardBorder: baseColors.blue[2],
  placeholder: baseColors.grey[3],
  disabled: baseColors.grey[2],
  primary: baseColors.blue[9],
  secondary: '#fff',
  tertiary: baseColors.blue[0],
  info: baseColors.green[8],
  advice: '',
  alert: baseColors.red[5],
  danger: baseColors.red[5],
  error: baseColors.red[7],
  success: baseColors.green[8],
  warning: baseColors.orange[5],
  active: baseColors.blue[7],
  input: {
    border: baseColors.grey[3],
    hover: baseColors.blue[7],
    focus: baseColors.blue[7],
  },
};

const baseSize = 16;
const breakpointsPx = ['360', '425', '768', '1040', '1400'];
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
    boxShadow: `0px 5px 18px rgba(57, 73, 171, 0.20);`,
  },
  2: {
    boxShadow: `0px 4px 22px rgba(26, 35, 126, 0.06);`,
  },
  3: {
    boxShadow: `0px 7px 20px rgba(26, 35, 126, 0.08);`,
  },
  4: {
    boxShadow: `0px 4px 23px rgba(26, 35, 126, 0.12);`,
  },
  5: {
    boxShadow: `0px 2px 4px rgba(26, 35, 126, 0.04), 0px 8px 16px rgba(26, 35, 126, 0.16);`,
  },
  6: {
    boxShadow: `1px 5px 22px 4px rgba(26, 35, 126, 0.15);`,
  },
  7: {
    boxShadow: `1px 5px 22px 4px rgba(26, 35, 126, 0.15);`,
  },
  8: {
    boxShadow: `0px 2px 8px rgba(40, 41, 61, 0.08), 0px 20px 32px rgba(96, 97, 112, 0.24);`,
  },
};
//Shaddows: 1-Form, 2-Medium, 3-Card, 4-Regular, 5-Base, 6-Huge, 7-Large, 8-Badge

export const space = [0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 112, 168].map(
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
//112: 10
//168: 11
export const zIndices = [0, 10, 50, 100, 500, 1000];

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
