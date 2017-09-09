import { FETCH_MEETUP, FETCH_CREATOR } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_MEETUP:
      return {  ...state, ...action.payload };
    case FETCH_CREATOR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
