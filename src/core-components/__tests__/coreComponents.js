import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../styles/theme';
import icons from '../../utils/icons';
import Anchor from '../Anchor';
import Button from '../Button';
import Div from '../Div';
import Heading from '../Heading';
import Image from '../Image';
import Input from '../Input';
import Label from '../Label';
import Legend from '../Legend';
import { ListItem, OrderedList, UnorderedList } from '../List';
import Paragraph from '../Paragraph';
import Section from '../Section';
import Select from '../Select';
import Span from '../Span';
import Svg from '../Svg';
import TextArea from '../Textarea';

it('renders Anchor tag', () => {
  render(
    <Anchor href="https://example.com" target="_blank" color="blue">
      Example page link
    </Anchor>
  );
  const a = screen.getByText(/example page link/i);
  expect(a).toBeInTheDocument();
  expect(a).toHaveAttribute('href', 'https://example.com');
  expect(a).toHaveAttribute('target', '_blank');
  expect(a).toHaveStyle('color: blue');
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

it('renders Legend components', async () => {
  render(
    <ThemeProvider theme={defaultTheme}>
      <>
        <Legend htmlFor="name">Joe Mouse</Legend>
      </>
    </ThemeProvider>
  );

  expect(screen.getByText(/joe mouse/i)).toBeInTheDocument();
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

it('renders Unordered List with ListItem components', async () => {
  const items = ['one', 'two', 'three'];
  render(
    <UnorderedList data-testid="ul" fontSize="16px" mt="20px">
      {items.map((item, i) => {
        return (
          <ListItem key={i} mb="10px" data-testid={`li${i}`}>
            {item}
          </ListItem>
        );
      })}
    </UnorderedList>
  );

  const ul = screen.getByTestId(/ul/i);
  const lis = screen.getAllByTestId(/li[0-9]/i);

  expect(ul).toBeInTheDocument();
  expect(ul).toHaveStyle({ 'font-size': '16px', 'margin-top': '20px' });
  expect(lis).toHaveLength(3);
  expect(lis[0]).toBeInTheDocument();
  expect(lis[1]).toHaveTextContent(/two/i);
  expect(lis[2]).toHaveStyle({ 'margin-bottom': '10px' });
});

it('renders Ordered List with ListItem components', async () => {
  const items = ['red', 'blue', 'green'];
  render(
    <OrderedList data-testid="ul" fontSize="16px" mt="20px">
      {items.map((item, i) => {
        return (
          <ListItem key={i} mb="10px" data-testid={`li${i}`}>
            {item}
          </ListItem>
        );
      })}
    </OrderedList>
  );

  const ol = screen.getByTestId(/ul/i);
  const lis = screen.getAllByTestId(/li[0-9]/i);

  expect(ol).toBeInTheDocument();
  expect(ol).toHaveStyle({ 'font-size': '16px', 'margin-top': '20px' });
  expect(lis).toHaveLength(3);
  expect(lis[0]).toBeInTheDocument();
  expect(lis[1]).toHaveTextContent(/blue/i);
  expect(lis[2]).toHaveStyle({ 'margin-bottom': '10px' });
});

describe('Select component', () => {
  it('should have the default option / placeholder correctly set ', async () => {
    const options = ['spring', 'summer', 'autumn', 'winter'];
    render(
      <ThemeProvider theme={defaultTheme}>
        <>
          <Label htmlFor="seasons">Seasons</Label>
          <Select
            options={options}
            placeholder="Seasons"
            name="seasons"
            id="seasons"
            fontSize="16px"
            mt="20px"
          />
        </>
      </ThemeProvider>
    );

    const select = screen.getByLabelText(/seasons/i);

    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute('name', 'seasons');
    expect(select).toHaveStyle({ 'font-size': '16px', 'margin-top': '20px' });
    expect(screen.getByRole('option', { name: 'Seasons' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Seasons' })).toHaveValue(
      'Seasons'
    );
  });

  it('displays the correct number of options', async () => {
    const options = ['spring', 'summer', 'autumn', 'winter'];
    render(
      <ThemeProvider theme={defaultTheme}>
        <>
          <Label htmlFor="seasons">Seasons</Label>
          <Select
            options={options}
            placeholder="Seasons"
            name="seasons"
            id="seasons"
          />
        </>
      </ThemeProvider>
    );

    expect(screen.getAllByRole('option').length).toBe(5);
  });

  it('renders without options', async () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <>
          <Label htmlFor="seasons">Seasons</Label>
          <Select placeholder="Seasons" name="seasons" id="seasons" />
        </>
      </ThemeProvider>
    );
    expect(screen.getAllByRole('option').length).toBe(1);
  });

  it('allows the user to select a specific option', async () => {
    const options = ['spring', 'summer', 'autumn', 'winter'];
    render(
      <ThemeProvider theme={defaultTheme}>
        <>
          <Label htmlFor="seasons">Seasons</Label>
          <Select
            options={options}
            placeholder="Seasons"
            name="seasons"
            id="seasons"
          />
        </>
      </ThemeProvider>
    );

    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'summer' })
    );
    expect(screen.getByRole('option', { name: 'summer' }).selected).toBe(true);

    await userEvent.selectOptions(
      // the select element has combobox as an implicit ARIA role
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'winter' })
    );
    expect(screen.getByRole('option', { name: 'winter' }).selected).toBe(true);
  });
});

describe('TextArea with Label component', () => {
  it('allows user to type in a maximum of ten chars', async () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <>
          <Label htmlFor="survey">Feedback</Label>
          <TextArea
            bg="yellow"
            id="survey"
            name="feedback"
            placeholder="Customer feedback"
            maxLength={10}
          />
        </>
      </ThemeProvider>
    );
    const textArea = screen.getByLabelText(/feedback/i);
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveAttribute('placeholder', 'Customer feedback');
    expect(textArea).toHaveAttribute('maxLength', '10');
    expect(textArea).toHaveStyle('background-color: yellow');

    const text16Chars = 'Great experience';
    const text10Chars = 'Great expe';
    await userEvent.type(textArea, text16Chars);
    expect(textArea).toHaveValue(text10Chars);
  });
});

it('renders SVG component', async () => {
  render(<Svg paths={icons['add-one']} role="img" aria-hidden="true" />);

  const svg = screen.getByRole('img', { hidden: true });
  expect(svg).toBeInTheDocument();
  expect(svg).toHaveAttribute('height', '26px');
  expect(svg).toHaveAttribute('viewBox', '0 0 48 48');
});
