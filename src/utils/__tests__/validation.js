import {
  validateEmail,
  // validateName,
  // validatePassword,
  // validateConfirmPassword,
  // validateGoalPriority,
  // validateTextBlocks,
  // validateEndDateInput,
  // validateStartDateInput,
  // cleanUpErrors,
  // validateSignupForm,
  // validateLoginForm,
  // validateGoalsForm,
} from '../validation';

const validEmails = [
  'joe@example.com',
  'jane.may@example.co.uk',
  'cat_23@gmail.com',
  'mouse.berry@gmail.com',
];

const invalidEmails = [
  'joeexample.com',
  'jane.may@example.c',
  'cat_23@gmail',
  'bird@gmail#ex.ca',
  'mouse.berry@gmail..com',
  '.berry@gmail.com',
  'berry@gmail..com',
];

describe('Validate Email Error message', () => {
  validEmails.map((email, index) => {
    it(`should return undefined for valid email with index ${index}`, () => {
      expect(validateEmail(email)).toBe(undefined);
    });
  });
  invalidEmails.map((email, index) => {
    it(`should return error message for invalid email with index ${index}`, () => {
      expect(validateEmail(email)).toBe('Invalid email address');
    });
  });

  it('should return "Required" error message when no value is passed', () => {
    expect(validateEmail()).toBe('Required');
  });
});
