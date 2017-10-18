import { combineReducers } from 'redux'
import auth from './auth_reducer';
import user from './user_reducer';
import meetupInfo from './meetup_form_reducer';
import meetups from './meetup_list_reducer';
import selectedMeetup from './selected_meetup_reducer';
import usersAttendingMeetup from './users_attending_meetup_reducer';
import profile from './profile_reducer';
import notifications from './notification_reducer';

const rootReducer = combineReducers({
  auth,
  user,
  meetupInfo,
  meetups,
  selectedMeetup,
  usersAttendingMeetup,
  profile,
  notifications
});

export default rootReducer;
