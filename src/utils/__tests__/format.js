import { capitalizeFirstLetter } from '../format';

describe('Capitalize word', () => {
  it('returns empty string if passed an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });

  it('returns phrase with capitalized first word', () => {
    const str = 'secondary goal';
    const expected = 'Secondary goal';
    expect(capitalizeFirstLetter(str)).toBe(expected);
  });

  it('returns capitalized word', () => {
    const str = 'sunshine';
    const expected = 'Sunshine';
    expect(capitalizeFirstLetter(str)).toBe(expected);
  });

  it('keeps first letter capitalized', () => {
    const str = 'Main goal';
    const expected = 'Main goal';
    expect(capitalizeFirstLetter(str)).toBe(expected);
  });

  it('throws error if the argument is undefined', () => {
    expect(() => capitalizeFirstLetter()).toThrowError();
  });
});
