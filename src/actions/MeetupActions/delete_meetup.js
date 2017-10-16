import firebase from 'firebase';
import { MEETUP_DELETED } from '../types';

export const deleteMeetup = (uid, callback) => async dispatch => {
  await firebase.storage().ref(`/meetups/${uid}`).delete();
  await firebase.database().ref(`/meetups/${uid}`).remove();
  await firebase.database().ref(`/usersGoingToMeetups/${uid}`).remove();
  dispatch({ type: MEETUP_DELETED });
  callback();
}
