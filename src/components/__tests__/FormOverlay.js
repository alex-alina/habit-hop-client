import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Div from '../../core-components/Div';
import Heading from '../../core-components/Heading';
import { renderWithTheme } from '../../utils/testUtils';
import FormOverlay from '../FormOverlay';

const text = 'You can close this overlay';
const clickHandler = jest.fn();

const OverlayContent = () => {
  return (
    <Div>
      <Heading>{text}</Heading>
    </Div>
  );
};

describe('FormOverlay', () => {
  it('renders FormOverlay with content', () => {
    renderWithTheme(
      <Div>
        <FormOverlay closeHandler={clickHandler}>
          <OverlayContent />
        </FormOverlay>
      </Div>
    );

    const formOverlay = screen.getByRole('dialog');
    const closeBtn = screen.getByLabelText('Close overlay');
    const btnIcon = screen.getByRole('graphics-symbol', { hidden: true });

    expect(formOverlay).toBeInTheDocument();
    expect(formOverlay).toHaveStyle('display: flex');
    expect(closeBtn).toBeInTheDocument();
    expect(btnIcon).toBeInTheDocument();
    expect(formOverlay).toHaveTextContent(text);
  });

  it('should call handler when the close button is clicked', async () => {
    renderWithTheme(
      <Div>
        <FormOverlay closeHandler={clickHandler}>
          <OverlayContent />
        </FormOverlay>
      </Div>
    );

    const closeBtn = screen.getByLabelText(/close overlay/i);
    await userEvent.click(closeBtn);
    expect(clickHandler).toHaveBeenCalled();
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
