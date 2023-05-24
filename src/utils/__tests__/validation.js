import * as dateModule from '../date';
import {
  validateConfirmPassword,
  validateEmail,
  validateEndDateInput,
  validateGoalDescription,
  validateGoalPriority,
  validateName,
  validatePassword,
  validateStartDateInput,
  cleanUpErrors,
  validateSignupForm,
  validateLoginForm,
  validateGoalsForm,
  validateHabitForm,
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

describe('Email validation', () => {
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

describe('Name validation', () => {
  it('should return undefined for valid name', () => {
    expect(validateName('Mike Mo')).toBe(undefined);
  });

  it('should return error message for values with less then 2 chars', () => {
    expect(validateName('J')).toBe('Name must have at least 2 characters');
  });

  it('should return "Required" error message when no value is passed', () => {
    expect(validateName()).toBe('Required');
  });
});

describe('Password validation', () => {
  it('should return undefined for valid pasword value', () => {
    expect(validatePassword('12crownNine')).toBe(undefined);
  });

  it('should return error message for values with less then 8 chars', () => {
    expect(validatePassword('bee4s')).toBe(
      'Pasword must have at least 8 characters'
    );
  });

  it('should return "Required" error message when no value is passed', () => {
    expect(validatePassword()).toBe('Required');
  });
});

describe('Confirm Password validation', () => {
  const password = '12crownNine';
  const confirmPassword = '12crownNine';

  it('should return undefined for valid pasword', () => {
    expect(validateConfirmPassword(password, confirmPassword)).toBe(undefined);
  });

  it('should return error message for values with less then 8 chars', () => {
    expect(validateConfirmPassword(password, '12crowNine')).toBe(
      "Passwords don't match"
    );
  });

  it('should return "Required" error message when no value is passed', () => {
    expect(validateConfirmPassword()).toBe('Required');
  });
});

describe('Goal priority validation', () => {
  it('should return "Required" error message when no value is passed', () => {
    expect(validateGoalPriority()).toBe('Required');
  });
});

describe('Goal Description validation', () => {
  let value = 'Lorem ipsum';
  let minChars = 5;
  let maxChars = 11;

  it('should return undefined for valid goal description value', () => {
    expect(validateGoalDescription(value, minChars, maxChars)).toBe(undefined);
  });

  it(`should return error message for values with less then ${minChars} chars`, () => {
    value = 'hi';
    expect(validateGoalDescription(value, minChars, maxChars)).toBe(
      `Goal description must have at least ${minChars} characters`
    );
  });

  it(`should return error message for values with more than then ${maxChars} chars`, () => {
    value = 'Lorem ipsum sunny';
    expect(validateGoalDescription(value, minChars, maxChars)).toBe(
      `Goal description must have less than ${maxChars} characters`
    );
  });

  it('should return "Required" error message when no value is passed', () => {
    expect(validateGoalDescription('', minChars, maxChars)).toBe('Required');
  });

  it('throws error if the minChars value is larger or equal to maxChar value', () => {
    expect(() => validateGoalDescription(value, 14, 5)).toThrow(Error);
    expect(() => validateGoalDescription(value, 14, 5)).toThrow(
      "minChars argument shouldn't be larger than maxChars"
    );
  });
});

describe('Start Date Input validation', () => {
  let date = '2023-03-23';

  it('should return undefined for valid start date', () => {
    expect(validateStartDateInput(date)).toBe(undefined);
  });

  it('should return "Required" error message when no value is passed', () => {
    expect(validateStartDateInput()).toBe('Required');
  });
});

describe('End Date Input validation', () => {
  let startDate = '2023-03-23';
  let endDate = '2023-06-16';
  let spyIsOneWeekFromDate;

  beforeEach(() => {
    spyIsOneWeekFromDate = jest.spyOn(dateModule, 'isOneWeekFromDate');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return undefined for valid end date', () => {
    spyIsOneWeekFromDate.mockReturnValue(true);
    expect(validateEndDateInput(startDate, endDate)).toBe(undefined);
    expect(spyIsOneWeekFromDate).toHaveBeenCalled();
  });

  it('should return error message when there is less than a week between start and end date', () => {
    spyIsOneWeekFromDate.mockReturnValue(false);
    expect(validateEndDateInput(startDate, endDate)).toBe(
      'You must alllow at least one week between the start and end dates'
    );
    expect(spyIsOneWeekFromDate).toHaveBeenCalled();
  });

  it('should return "Required" error message when no values are passed', () => {
    expect(validateEndDateInput()).toBe('Required');
  });
});

const errorsMock = {
  confirmPassword: 'Required',
  email: 'Required',
  firstName: 'Name must have at least 2 characters',
  lastName: 'Required',
  password: 'Required',
};

const cleanErrorsMock = {
  ...errorsMock,
};

const partialErrorsMock = {
  confirmPassword: 'Required',
  email: 'Required',
  firstName: undefined,
  lastName: undefined,
  password: 'Required',
};

const cleanedPartialErrorsMock = {
  confirmPassword: 'Required',
  email: 'Required',
  password: 'Required',
};

describe('cleanUpErrors util', () => {
  it('should not filter out any of the errors', () => {
    expect(cleanUpErrors(errorsMock)).toEqual(cleanErrorsMock);
  });

  it('should filter out all errors that have a value of undefined', () => {
    expect(cleanUpErrors(partialErrorsMock)).toEqual(cleanedPartialErrorsMock);
  });
});

const signupValues = {
  confirmPassword: 'hillShadow',
  email: 'jimmy@example.com',
  firstName: 'Jimmy',
  lastName: 'Berry',
  password: 'hillShadow',
};

const invalidSignupValues = {
  confirmPassword: '',
  email: '',
  firstName: 'Jimmy',
  lastName: 'Berry',
  password: '',
};

describe('Signup Form validation', () => {
  it('should return an empty errors object if all form values are valid', () => {
    expect(validateSignupForm(signupValues)).toEqual({});
  });

  it("should return an errors' object if one or more form values are invalid", () => {
    expect(validateSignupForm(invalidSignupValues)).toEqual(
      cleanedPartialErrorsMock
    );
  });
});

const loginValues = {
  email: 'jimmy@example.com',
  password: 'hillShadow',
};

const invalidLoginValues = {
  email: 'berry@example',
  password: '',
};

const loginErrors = {
  email: 'Invalid email address',
  password: 'Required',
};

describe('Login Form validation', () => {
  it('should return an empty errors object if all form values are valid', () => {
    expect(validateLoginForm(loginValues)).toEqual({});
  });

  it("should return an errors' object if one or more form values are invalid", () => {
    expect(validateLoginForm(invalidLoginValues)).toEqual(loginErrors);
  });
});

const goalFormValues = {
  goalDefinition:
    'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
  priority: 'main',
  startDate: '2023-03-23',
  endDate: '2023-06-16',
};

const invalidGoalFormValues = {
  goalDefinition:
    'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
  priority: '',
  startDate: '',
  endDate: '',
};

const goalFormErrors = {
  priority: 'Required',
  startDate: 'Required',
  endDate: 'Required',
};

describe('Goals Form validation', () => {
  let spyIsOneWeekFromDate;

  beforeEach(() => {
    spyIsOneWeekFromDate = jest.spyOn(dateModule, 'isOneWeekFromDate');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return an empty errors object if all form values are valid', () => {
    spyIsOneWeekFromDate.mockReturnValue(true);
    expect(validateGoalsForm(goalFormValues)).toEqual({});
    expect(spyIsOneWeekFromDate).toHaveBeenCalled();
  });

  it("should return an errors' object including one or more error key - values", () => {
    expect(validateGoalsForm(invalidGoalFormValues)).toEqual(goalFormErrors);
  });

  const signupValues = {
    confirmPassword: 'hillShadow',
    email: 'jimmy@example.com',
    firstName: 'Jimmy',
    lastName: 'Berry',
    password: 'hillShadow',
  };

  const invalidSignupValues = {
    confirmPassword: '',
    email: '',
    firstName: 'Jimmy',
    lastName: 'Berry',
    password: '',
  };

  describe('Signup Form validation', () => {
    it('should return an empty errors object if all form values are valid', () => {
      expect(validateSignupForm(signupValues)).toEqual({});
    });

    it("should return an errors' object if one or more form values are invalid", () => {
      expect(validateSignupForm(invalidSignupValues)).toEqual(
        cleanedPartialErrorsMock
      );
    });
  });

  const habitValues = {
    habitDescription: 'Do yoga daily',
    habitType: 'develop',
    progressMetric: 'minutes',
  };

  const invalidhabitValues = {
    habitDescription: 'Do yoga daily',
    habitType: '',
    progressMetric: '',
  };

  const habitFormErrors = {
    habitType: 'Required',
    progressMetric: 'Required',
  };

  describe('Habit Form validation', () => {
    it('should return an empty errors object if all form values are valid', () => {
      expect(validateHabitForm(habitValues)).toEqual({});
    });

    it("should return an errors' object if one or more form values are invalid", () => {
      expect(validateHabitForm(invalidhabitValues)).toEqual(habitFormErrors);
    });
  });
});
