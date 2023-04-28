import { dateToTimestamp, isPresentDate, isOneWeekFromDate } from '../date';

it('converts yyyy-mm-dd date format to timestamp', () => {
  let date = '2023-04-18';
  let timestamp = 1681776000000;
  expect(dateToTimestamp(date)).toBe(timestamp);
});

describe('isPresentDate util', () => {
  let date = '2023-04-18';
  let today = '2023-04-16';

  it('returns true if date is in the present', () => {
    expect(isPresentDate(date, today)).toBe(true);
  });

  it('returns false if date is in the past', () => {
    date = '2023-04-13';
    expect(isPresentDate(date, today)).toBe(false);
  });

  it('throws error if date is undefined', () => {
    expect(() => isPresentDate()).toThrow(Error);
    expect(() => isPresentDate()).toThrow('selected date value is missing');
  });

  it('throws error if date format is different than yyyy-mm-dd', () => {
    expect(() => isPresentDate('hello')).toThrow(Error);
    expect(() => isPresentDate('hello')).toThrow(
      'date format should be YYYY-MM-DD'
    );
  });
});

describe('isOneWeekFromDate util', () => {
  let endDate = '2023-04-18';
  let startDate = '2023-04-10';

  it('returns true if offset date is at least 7 days after the reference date', () => {
    expect(isOneWeekFromDate(startDate, endDate)).toBe(true);
  });

  it('returns false if there are less than 7 days between the dates', () => {
    endDate = '2023-04-16';
    expect(isOneWeekFromDate(startDate, endDate)).toBe(false);
  });
  it('returns true if there are exactly 7 days between the dates', () => {
    endDate = '2023-04-17';
    expect(isOneWeekFromDate(startDate, endDate)).toBe(true);
  });
});
