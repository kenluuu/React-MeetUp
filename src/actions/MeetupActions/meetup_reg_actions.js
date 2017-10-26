import firebase from 'firebase';

export const registerForMeetup = (uid, creatorID, user, callback) => async dispatch => {
  const { userId, firstName, lastName, photo } = user;
  if (!userId) {
    return callback();
  }
  const note = `${firstName} ${lastName} registered for your meetup.`
  await firebase.database().ref(`/usersGoingToMeetups/${uid}/${userId}`)
    .set({ firstName, lastName, photo });
  await firebase.database().ref(`/notifications/${creatorID}`)
    .push({ note, eventUID: uid, eventCreatorID: creatorID });
}

export const unregisterForMeetup = (uid, userId, creatorID) => async dispatch => {
  await firebase.database().ref(`/usersGoingToMeetups/${uid}/${userId}`).remove();
}
