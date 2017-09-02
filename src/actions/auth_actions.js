import {
  FIRST_NAME_CHANGE,
  LAST_NAME_CHANGE,
  EMAIL_CHANGE,
  PASSWORD_CHANGE
} from './types'

export const firstNameChange = (value) => {
  return {
    type: FIRST_NAME_CHANGE,
    payload: value
  };
};

export const lastNameChange = (value) => {
  return {
    type: LAST_NAME_CHANGE,
    payload: value
  };
};

export const emailChange = (value) => {
  return {
    type: EMAIL_CHANGE,
    payload: value
  };
};

export const passwordChange = (value) => {
  return {
    type: PASSWORD_CHANGE,
    payload: value
  };
};
