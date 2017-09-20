import firebase from 'firebase';
import { LOAD, CREATE_MEETUP_FAIL } from '../types';
import { validate, addPhoto, clearForm } from './utils';



export const createMeetup = (meetupInfo, user, callback) => async dispatch => {
  const { name, location, img, date, time, description } = meetupInfo;
  const { firstName, lastName, userId } = user;

  if(validate(meetupInfo)) {
    dispatch({ type: LOAD })
    const { key } = await firebase.database().ref(`/meetups`)
      .push({ name, description, location, date, time, creatorID: userId });
    await addPhoto(dispatch, key, img);
    await firebase.database().ref(`/usersGoingToMeetups/${key}/${userId}`)
      .set({ firstName, lastName });
    callback();
    clearForm();
  } else {
    dispatch({ type: CREATE_MEETUP_FAIL });
  }
};
