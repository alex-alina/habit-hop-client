import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/theme';
import Anchor from '../Anchor';
import Button from '../Button';
import Div from '../Div';
import Heading from '../Heading';
import Image from '../Image';
import { Input } from '../Input';
import Label from '../Label';
import Paragraph from '../Paragraph';
import Section from '../Section';
import Span from '../Span';

it('renders Anchor tag', () => {
  render(
    <Anchor href="https://example.com" target="_blank">
      Example page link
    </Anchor>
  );
  const a = screen.getByText(/example page link/i);
  expect(a).toBeInTheDocument();
  expect(a).toHaveAttribute('href', 'https://example.com');
  expect(a).toHaveAttribute('target', '_blank');
});

it('renders Button component', async () => {
  const clickHandlerMock = jest.fn();
  render(
    <Button
      variant="primaryLg"
      width="150px"
      onClick={() => clickHandlerMock()}
    >
      Sign up
    </Button>
  );

  const button = screen.getByText(/sign up/i);
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('width', '150px');

  await userEvent.click(button);
  expect(clickHandlerMock).toHaveBeenCalledTimes(1);
});

it('renders Div component', async () => {
  render(
    <Div backgroundColor="orange" role="alert">
      Rain Warning!
    </Div>
  );

  const div = screen.getByText(/rain warning!/i);
  expect(div).toBeInTheDocument();
  expect(div).toHaveAttribute('role', 'alert');
  expect(div).toHaveStyle('background-color: orange');
});

it('renders Heading component', async () => {
  const { rerender } = render(
    <Heading color="blue">I'm a short title!</Heading>
  );

  const heading = screen.getByText(/I'm a short title!/i);
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveStyle('color: blue');
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

  rerender(<Heading as="h3">Hello</Heading>);
  expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
});

it('renders Image component', async () => {
  render(<Image src="/path" alt="Orange lemon" />);

  const image = screen.getByAltText(/orange lemon/i);
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', '/path');
});

it('renders Input with Label components', async () => {
  render(
    <ThemeProvider theme={defaultTheme}>
      <>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" placeholder="Full Name" />
      </>
    </ThemeProvider>
  );
  const label = screen.getByText(/full name/i);
  const input = screen.getByLabelText(/full name/i);
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('type', 'text');
  expect(label).toHaveAttribute('for', 'name');

  await userEvent.type(input, 'Joe Mouse');
  expect(input).toHaveValue('Joe Mouse');
});

it('renders Paragraph component', async () => {
  render(
    <Paragraph fontSize="16px" color="blue">
      Hello sunshine
    </Paragraph>
  );

  const p = screen.getByText(/hello sunshine/i);
  expect(p).toBeInTheDocument();
  expect(p).toHaveStyle({ color: 'blue', 'font-size': '16px' });
});

it('renders Section component', async () => {
  render(
    <Section role="introduction">
      <Heading as="h2">Introduction to drawing</Heading>
    </Section>
  );

  const section = screen.getByRole(/introduction/i);
  expect(section).toBeInTheDocument();
  expect(section).toHaveTextContent(/introduction to drawing/i);
});

it('renders Span component', async () => {
  render(
    <Paragraph>
      Good morning <Span backgroundColor="orange">sunshine</Span>
    </Paragraph>
  );

  const span = screen.getByText(/sunshine/i);
  expect(span).toBeInTheDocument();
  expect(span).toHaveStyle('background-color: orange');
});
