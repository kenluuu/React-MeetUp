import firebase from 'firebase';
import { FETCH_MEETUP, FETCH_MEETUPS, FETCH_CREATOR, FETCH_ATTENDING_USERS } from '../types';

export const fetchMeetups = () => dispatch => {
  firebase.database().ref('/meetups')
    .on('value', snapshot => {
      dispatch({ type: FETCH_MEETUPS, payload: snapshot.val()});
    });
};

export const fetchMeetup = uid => dispatch => {
  firebase.database().ref(`/meetups/${uid}`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_MEETUP, payload: snapshot.val() });
    });
};

export const fetchCreator = creatorID => dispatch => {
  firebase.database().ref(`/users/${creatorID}`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_CREATOR, payload: snapshot.val() });
    });
};

export const fetchAttendingUsers = uid => dispatch => {
  firebase.database().ref(`/usersGoingToMeetups/${uid}`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_ATTENDING_USERS, payload: snapshot.val() });
    });
}
