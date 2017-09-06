import { combineReducers } from 'redux'
import auth from './auth_reducer';
import user from './user_reducer';
import meetupInfo from './create_meetup_reducer';
const rootReducer = combineReducers({
  auth,
  user,
  meetupInfo
});

export default rootReducer;
