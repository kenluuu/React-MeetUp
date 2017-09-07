import {
  MEETUP_INPUT_CHANGE,
  CREATE_MEETUP_SUCCESSFUL,
  CREATE_MEETUP_FAIL,
  LOAD
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  description: '',
  location: '',
  img: null,
  time: '',
  date: '',
  error: '',
  loading: false
};
export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case MEETUP_INPUT_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value, error: '' };
    case CREATE_MEETUP_SUCCESSFUL:
      return INITIAL_STATE;
    case CREATE_MEETUP_FAIL:
      return { ...state, error: 'All Fields Must Be Filled Out' };
    case LOAD:
      return { ...state, loading: true, error: '' };
    default:
      return state;
  }
};
