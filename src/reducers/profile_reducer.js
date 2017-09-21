import {
  FETCH_PROFILE_INFO,
  PROFILE_INPUT_CHANGE,
  LOAD,
  EDIT_PROFILE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_PROFILE_INFO:
      return { ...action.payload, loading: false };
    case PROFILE_INPUT_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case LOAD:
      return { ...state, loading: true };
    case EDIT_PROFILE_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
}
