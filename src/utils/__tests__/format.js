import { capitalizeFirstChar } from '../format';

describe('capitalizeFirstChar util', () => {
  it('returns empty string if passed an empty string', () => {
    expect(capitalizeFirstChar('')).toBe('');
  });

  it('returns phrase with capitalized first char', () => {
    const str = 'secondary goal';
    const expected = 'Secondary goal';
    expect(capitalizeFirstChar(str)).toBe(expected);
  });

  it('returns first char capitalized', () => {
    const str = 'sunshine';
    const expected = 'Sunshine';
    expect(capitalizeFirstChar(str)).toBe(expected);
  });

  it('trimms white spaces and returns first char capitalized', () => {
    const str = '   hello! ';
    const expected = 'Hello!';
    expect(capitalizeFirstChar(str)).toBe(expected);
  });

  it('keeps first letter capitalized', () => {
    const str = 'Main goal';
    const expected = 'Main goal';
    expect(capitalizeFirstChar(str)).toBe(expected);
  });

  it('throws error if the argument is undefined', () => {
    expect(() => capitalizeFirstChar()).toThrow(Error);
    expect(() => capitalizeFirstChar()).toThrow(
      'requires one argument of type string'
    );
  });
});
