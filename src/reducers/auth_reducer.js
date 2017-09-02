import {
  FIRST_NAME_CHANGE,
  LAST_NAME_CHANGE,
  EMAIL_CHANGE,
  PASSWORD_CHANGE
} from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FIRST_NAME_CHANGE:
      const firstName = action.payload;
      return { ...state, firstName };
    case LAST_NAME_CHANGE:
      const lastName = action.payload;
      return { ...state, lastName };
    case EMAIL_CHANGE:
      const email = action.payload;
      return { ...state, email };
    case PASSWORD_CHANGE:
      const password = action.payload;
      return { ...state, password };
    default:
      return state;
  }
};
