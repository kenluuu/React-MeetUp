import {
  INPUT_CHANGE,
  SIGNUP_FAIL,
  LOGIN_FAIL,
  LOAD,
  CLEAR
} from '../actions/types';


const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case INPUT_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value, error: '' };
    case LOGIN_FAIL:
      return { ...state, error: 'Authentication Failed', loading: false };
    case SIGNUP_FAIL:
      return { ...state, error: 'Failed To Create User', loading: false };
    case LOAD:
      return { ...state, loading: true, error: '' };
    case CLEAR:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
