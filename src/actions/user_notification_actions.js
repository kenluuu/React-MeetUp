import firebase from 'firebase';
import { FETCH_NOTIFICATION } from './types';

export const fetchNotifications = userId => dispatch => {
  firebase.database().ref(`/notifications/${userId}`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_NOTIFICATION, payload: snapshot.val() })
    })
}

export const editNotificationLength = (userId, notificationLength) => async dispatch => {
  await firebase.database().ref(`users/${userId}`).update({ notificationLength });
}
