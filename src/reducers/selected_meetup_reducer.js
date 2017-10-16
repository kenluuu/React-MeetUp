import {
  FETCH_MEETUP,
  FETCH_CREATOR,
  MEETUP_INPUT_CHANGE,
  EDIT_MEETUP_SUCCESS,
  LOAD,
  MEETUP_DELETED
} from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case MEETUP_INPUT_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case FETCH_MEETUP:
      return action.payload;
    case EDIT_MEETUP_SUCCESS:
      return { ...state, loading: false };
    case FETCH_CREATOR:
      const { firstName, lastName } = action.payload;
      return { ...state, firstName, lastName };
    case LOAD:
      return { ...state, loading: true };
    case MEETUP_DELETED:
      return state;
    default:
      return state;
  }
};
