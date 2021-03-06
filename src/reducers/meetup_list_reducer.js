import {
  FETCH_MEETUPS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_MEETUPS:
      return action.payload;
    default:
      return state;
  }
};
