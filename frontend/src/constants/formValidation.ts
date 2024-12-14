export const usernameValidation = {
  required: {
    value: true,
    message: "Username is required",
  },
  minLength: {
    value: 2,
    message: "Username can't be less than 2 characters",
  },
  maxLength: {
    value: 20,
    message: "Username can't be more than 20 character",
  },
};

export const emailValidation = {
  required: {
    value: true,
    message: "Email is required",
  },
  pattern: {
    value:
      /^(?:(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(?:"(?:[^\\"]*)"))@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
    message: "Please enter a valid email",
  },
};

export const passwordValidation = {
  required: {
    value: true,
    message: "Password is required",
  },
  minLength: {
    value: 8,
    message: "Password can't be less than 8 characters",
  },
  maxLength: {
    value: 20,
    message: "Password can't be more than 20 characters",
  },
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()[\]{}\-=_+|;:'",.<>?/]).{8,}$/,
    message:
      "Password should have at least 1 uppercase, 1 lowercase , 1 special character",
  },
};
