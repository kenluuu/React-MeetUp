import {
  FETCH_MEETUP,
  FETCH_CREATOR,
  MEETUP_DELETED
} from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_MEETUP:
      return { ...state, ...action.payload };
    case FETCH_CREATOR:
      const { firstName, lastName } = action.payload;
      return { ...state, firstName, lastName };
    case MEETUP_DELETED:
      return state;
    default:
      return state;
  }
};
