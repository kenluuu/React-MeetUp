import { MEETUP_INPUT_CHANGE } from '../types';

export const meetupInputChange = ({ prop, value }) => {
  if (prop === 'time') {
    value = value.toLocaleTimeString();
  } else if (prop === 'date') {
    value = value.toLocaleDateString(['en-US'], {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
  
  return {
    type: MEETUP_INPUT_CHANGE,
    payload: { prop, value }
  };
};
