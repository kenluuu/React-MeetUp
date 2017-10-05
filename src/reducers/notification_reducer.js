import { FETCH_NOTIFICATION, SIGNOUT } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_NOTIFICATION:
      return action.payload;
    case SIGNOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
