import firebase from 'firebase';

export const deleteMeetup = (uid, callback) => async dispatch => {
  await firebase.storage().ref(`/meetups/${uid}`).delete();
  await firebase.database().ref(`/meetups/${uid}`).remove();
  await firebase.database().ref(`/usersGoingToMeetups/${uid}`).remove();
  callback();
}
