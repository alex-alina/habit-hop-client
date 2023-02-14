import React from 'react';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders sign up page title', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const titleElement = screen.getByText(/Welcome home, duckie/i);
  expect(titleElement).toBeInTheDocument();
});
