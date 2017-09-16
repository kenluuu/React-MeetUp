import {
  FETCH_MEETUP,
  FETCH_CREATOR,
  MEETUP_INPUT_CHANGE,
  EDIT_MEETUP_SUCCESS,
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
      return { ...state, [action.payload.prop]: action.payload.value };
    case FETCH_MEETUP:
      return {  ...state, ...action.payload, loading: false };
    case EDIT_MEETUP_SUCCESS:
      return { ...state, loading: false, img: null };
    case FETCH_CREATOR:
      return { ...state, ...action.payload };
    case LOAD:
      return { ...state, loading: true };
    default:
      return state;
  }
};
