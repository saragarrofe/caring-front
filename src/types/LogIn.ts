export type LoginErrors = {
  email?: string;
  password?: string;
};

export type RegisterErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
};

const msg = {
  email: {
    required: 'Email is required',
    invalid: 'Invalid email format',
  },
  password: {
    required: 'Password is required',
    short: 'Password must be at least 6 characters',
  },
};

export function validateData(email: string, password: string): LoginErrors {
  const regex = /^\S+@\S+\.\S+$/;
  const errors: LoginErrors = {};

  if (!email) {
    errors.email = msg.email.required;
  } else if (!regex.test(email)) {
    errors.email = msg.email.invalid;
  }

  if (!password) {
    errors.password = msg.password.required;
  } else if (password.length < 6) {
    errors.password = msg.password.short;
  }

  return errors;
}
