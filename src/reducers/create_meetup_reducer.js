import { MEETUP_INPUT_CHANGE, CREATE_MEETUP } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  description: '',
  location: '',
  img: null,
  time: '',
  date: '',
};
export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case MEETUP_INPUT_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CREATE_MEETUP:
      return { ...state };
    default:
      return state;
  }
};
