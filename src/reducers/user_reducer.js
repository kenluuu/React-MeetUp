
import { GOT_CURRENT_USER, SIGNOUT } from '../actions/types';
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case GOT_CURRENT_USER:
      return action.payload;
    case SIGNOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
