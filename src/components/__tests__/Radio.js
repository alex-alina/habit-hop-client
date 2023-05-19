import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Label from '../../core-components/Label';
import Radio from '../Radio';

import { renderWithTheme } from '../../utils/testUtils';

describe('Styled Radio component', () => {
  it('renders two radio elements', async () => {
    renderWithTheme(
      <>
        <Label htmlFor="first-color">Blue</Label>
        <Radio
          id="first-color"
          name="color"
          mt={4}
          data-testid="radio"
          value="blue"
        />

        <Label htmlFor="second-color">Red</Label>
        <Radio
          id="second-color"
          name="color"
          mt={4}
          data-testid="radio"
          value="red"
        />
      </>
    );

    const firstRadio = screen.getByLabelText('Blue');
    expect(firstRadio).toBeInTheDocument();
    expect(screen.getByLabelText('Red')).toBeInTheDocument();
    await userEvent.click(firstRadio);
    expect(firstRadio).toHaveStyle('background-color: #303F9F');
    expect(screen.getByLabelText('Red')).toHaveStyle(
      'background-color: #AEB6BF'
    );
  });
});
