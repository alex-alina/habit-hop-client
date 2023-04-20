import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/theme';

// export function renderWithTheme(ui, renderOptions) {
//   function Wrapper({ children }) {
//     return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
//   }

//   return {
//     ...render(ui, { wrapper: Wrapper, ...renderOptions }),
//   };
// }

const ThemeProviders = ({ children }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

export const renderWithTheme = (ui, options) =>
  render(ui, { wrapper: ThemeProviders, ...options });
