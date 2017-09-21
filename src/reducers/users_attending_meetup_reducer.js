import { FETCH_ATTENDING_USERS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_ATTENDING_USERS:
      return action.payload;
    default:
      return state;
  }
};
