import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { setupStore } from '../app/store';
import defaultTheme from '../styles/theme';

export function renderWithProvidersAndRouter(
  ui,
  { store = setupStore(), route = '/', ...renderOptions } = {}
) {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  }

  return {
    store,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
// import React from 'react';
// import { ThemeProvider } from 'styled-components';
// import defaultTheme from '../styles/theme';

const Wrapper = ({ children }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

export const renderWithTheme = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options });
