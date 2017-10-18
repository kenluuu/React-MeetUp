import firebase from 'firebase';
import { LOAD, FILL_MEETUP_FORM } from '../types';
import { addPhoto, clearForm } from '../utils';


export const editMeetup = (meetupInfo, uid, callback) => async dispatch => {
  const { name, location, img, date, time, description } = meetupInfo;
  dispatch({ type: LOAD })
  await firebase.database().ref(`meetups/${uid}`)
    .update({ name, location, date, time, description });
  if(img) {
    await addPhoto(dispatch, uid, img);
  }
  callback();
  clearForm();
}

export const fillMeetupForm = (data) => {

  return { type: FILL_MEETUP_FORM, payload: data };
}
