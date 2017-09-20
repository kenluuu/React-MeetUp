import firebase from 'firebase';

export const registerForMeetup = (uid, user) => async dispatch => {
  const { userId, firstName, lastName } = user;
  await firebase.database().ref(`/usersGoingToMeetups/${uid}/${userId}`)
    .set({ firstName, lastName });
}

export const unregisterForMeetup = (uid, userId) => async dispatch => {
  await firebase.database().ref(`/usersGoingToMeetups/${uid}/${userId}`).remove();
}
