import { screen } from '@testing-library/react';
import Div from '../../core-components/Div';
import Span from '../../core-components/Span';
import { renderWithTheme } from '../../utils/testUtils';
import SmallCard from '../SmallCard';

const TestComponent = () => {
  return (
    <Div>
      <Span>Hello rain</Span>
    </Div>
  );
};

describe('SmallCard component', () => {
  it('renders with text content', () => {
    renderWithTheme(<SmallCard>Hello sunshine</SmallCard>);

    expect(screen.getByText('Hello sunshine')).toBeInTheDocument();
  });

  it('renders with component as childred', () => {
    renderWithTheme(
      <SmallCard>
        <TestComponent />
      </SmallCard>
    );

    expect(screen.getByText('Hello rain')).toBeInTheDocument();
  });

  it('renders empty card', () => {
    renderWithTheme(
      <SmallCard data-testid="small-card" borderColor="#7986CB" />
    );

    expect(screen.getByTestId('small-card')).toHaveStyle(
      'border-color:#7986CB'
    );
  });
});
