import firebase from 'firebase';
import { CLEAR, EDIT_MEETUP_SUCCESS } from '../types';

export const validate = meetupInfo => {
  for (let key in meetupInfo) {
    if(!meetupInfo[key]) {
      return false;
    }
  }
  return true;
};

export const addPhoto = async (dispatch, key, img) => {
  const imageData = await firebase.storage().ref(`/meetups/${key}`).put(img);
  const imageURL = imageData.metadata.downloadURLs[0];
  await firebase.database().ref(`meetups/${key}`).update({ imageURL });
}

export const clearForm = () => dispatch => {
  dispatch({ type: CLEAR });
  dispatch({ type: EDIT_MEETUP_SUCCESS });
};
