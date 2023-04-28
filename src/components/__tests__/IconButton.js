import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconButton from '../IconButton';

import icons from '../../utils/icons';
import { renderWithTheme } from '../../utils/testUtils';

describe('IconButton', () => {
  const iconList = Object.keys(icons);
  const firstIcon = iconList[0];
  const clickHandler = jest.fn();

  it('renders IconButton with icon and text', () => {
    renderWithTheme(
      <IconButton
        iconName={firstIcon}
        variant="primaryLg"
        onClick={clickHandler}
        mt={4}
      >
        Edit
      </IconButton>
    );

    const button = screen.getByText(/edit/i);
    const icon = screen.getByRole('graphics-symbol', { hidden: true });
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle('margin-top: 1em');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle('width: 18px');
  });

  it('should call the handler when clicked', async () => {
    renderWithTheme(
      <IconButton
        iconName={firstIcon}
        variant="primaryLg"
        onClick={clickHandler}
        mt={4}
        data-testid="button"
      >
        Edit
      </IconButton>
    );

    await userEvent.click(screen.getByTestId('button'));
    expect(clickHandler).toHaveBeenCalled();
    await userEvent.click(screen.getByTestId('button'));
    expect(clickHandler).toHaveBeenCalledTimes(2);
  });
});
