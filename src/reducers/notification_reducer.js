import { FETCH_NOTIFICATION } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_NOTIFICATION:
      return action.payload;
    default:
      return state;
  }
};
