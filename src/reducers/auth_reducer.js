import {
  USER_CREATE_SUCCESSFUL,
  USER_SIGNIN_SUCCESSFUL,
  GET_CURRENT_USER_ID,
  INPUT_CHANGE
} from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  user: ''
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case INPUT_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case USER_CREATE_SUCCESSFUL:
      return { ...state, user: action.payload.uid };
    case USER_SIGNIN_SUCCESSFUL:
      return { ...state, user: action.payload.uid };
    case GET_CURRENT_USER_ID:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
