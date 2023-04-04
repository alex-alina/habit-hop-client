import { isPresentDate, isOneWeekFromDate } from '../date';

let offset = '2023-04-18';
let reference = '2023-04-10';

describe('Is one week from date', () => {
  it('returns true if offset date is at least 7 days after the reference date', () => {
    expect(isOneWeekFromDate(offset, reference)).toBe(true);
  });

  it('returns false if there are less than 7 dasys between the dates', () => {
    offset = '2023-04-16';
    expect(isOneWeekFromDate(offset, reference)).toBe(false);
  });
});
