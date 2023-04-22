import Banner from '../Banner';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithTheme } from '../../utils/testUtils';
import icons from '../../utils/icons';

describe('Banner', () => {
  const iconList = Object.keys(icons);
  const firstIcon = iconList[0];
  const text = 'You can close this banner';

  it('renders Banner with text and icon', () => {
    renderWithTheme(
      <Banner iconName={firstIcon} mt={4} data-testid="banner">
        {text}
      </Banner>
    );

    const banner = screen.getByText(text);
    const icon = screen.getByRole('graphics-symbol', { hidden: true });
    expect(banner).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle('width: 20px');
  });

  it('should close the banner', async () => {
    renderWithTheme(
      <Banner iconName={firstIcon} mt={4}>
        {text}
      </Banner>
    );

    const banner = screen.getByText(text);
    expect(banner).toBeInTheDocument();
    await userEvent.click(
      screen.getByRole('button', { name: /close banner/i })
    );
    expect(banner).not.toBeInTheDocument();
  });
});
