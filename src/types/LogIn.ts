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
