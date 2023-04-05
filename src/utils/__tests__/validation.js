import {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
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

describe('Validate Email', () => {
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

describe('Validate Name', () => {
  it(`should return undefined for valid name`, () => {
    expect(validateName('Mike Mo')).toBe(undefined);
  });

  it(`should return error message for values with less then 2 chars`, () => {
    expect(validateName('J')).toBe('Name must have at least 2 characters');
  });

  it('should return "Required" error message when no value is passed', () => {
    expect(validateName()).toBe('Required');
  });
});

describe('Validate Password', () => {
  it(`should return undefined for valid pasword`, () => {
    expect(validatePassword('12crownNine')).toBe(undefined);
  });

  it(`should return error message for values with less then 8 chars`, () => {
    expect(validatePassword('bee4s')).toBe(
      'Pasword must have at least 8 characters'
    );
  });

  it('should return "Required" error message when no value is passed', () => {
    expect(validatePassword()).toBe('Required');
  });
});

describe('Validate Confirm Password', () => {
  const password = '12crownNine';
  const confirmPassword = '12crownNine';
  it(`should return undefined for valid pasword`, () => {
    expect(validateConfirmPassword(password, confirmPassword)).toBe(undefined);
  });

  it(`should return error message for values with less then 8 chars`, () => {
    expect(validateConfirmPassword(password, '12crowNine')).toBe(
      "Passwords don't match"
    );
  });

  it('should return "Required" error message when no value is passed', () => {
    expect(validateConfirmPassword()).toBe('Required');
  });
});
