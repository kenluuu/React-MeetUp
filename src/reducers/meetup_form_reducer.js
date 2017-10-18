import {
  MEETUP_INPUT_CHANGE,
  CLEAR,
  CREATE_MEETUP_FAIL,
  LOAD,
  EDIT_MEETUP_SUCCESS,
  FILL_MEETUP_FORM
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  description: '',
  location: '',
  time: '',
  date: '',
  error: '',
  loading: false
};
export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case MEETUP_INPUT_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value, error: '' };
    case FILL_MEETUP_FORM:
      return { ...state, ...action.payload };
    case CLEAR:
      return INITIAL_STATE;
    case CREATE_MEETUP_FAIL:
      return { ...state, error: 'All Fields Must Be Filled Out' };
    case LOAD:
      return { ...state, loading: true, error: '' };
    case EDIT_MEETUP_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
};
