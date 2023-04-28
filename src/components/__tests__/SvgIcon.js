import { render, screen } from '@testing-library/react';
import icons from '../../utils/icons';
import SvgIcon from '../SvgIcon';

describe('SvgIcon', () => {
  const iconList = Object.keys(icons);
  const firstIcon = iconList[0];

  it('renders SvgIcon', () => {
    const { rerender } = render(<SvgIcon name={firstIcon} role="img" />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveStyle('width: 26px');

    rerender(
      <SvgIcon name={firstIcon} role="graphics-symbol" aria-hidden="true" />
    );

    expect(
      screen.getByRole('graphics-symbol', { hidden: true })
    ).toBeInTheDocument();
  });

  it('should not render SvgIcon if the icon name is incorrect', () => {
    render(<SvgIcon name="invisible-icon" role="img" />);

    const svgIcon = screen.queryByRole('img');
    expect(svgIcon).not.toBeInTheDocument();
  });
});
