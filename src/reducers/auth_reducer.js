import {
  USER_CREATE_SUCCESSFUL,
  USER_SIGNIN_SUCCESSFUL,
  GET_CURRENT_USER_ID,
  INPUT_CHANGE,
  SIGNUP_FAIL,
  LOGIN_FAIL,
  LOAD,
  SIGNOUT
} from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case INPUT_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case USER_CREATE_SUCCESSFUL:
      return { ...INITIAL_STATE, user: action.payload.uid };
    case USER_SIGNIN_SUCCESSFUL:
      return { ...INITIAL_STATE, user: action.payload.uid };
    case GET_CURRENT_USER_ID:
      return { ...state, user: action.payload };
    case LOGIN_FAIL:
      return { ...state, error: 'Authentication Failed', loading: false };
    case SIGNUP_FAIL:
      return { ...state, error: 'Failed To Create User', loading: false };
    case LOAD:
      return { ...state, loading: true };
    case SIGNOUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
