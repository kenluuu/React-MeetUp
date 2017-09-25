import firebase from 'firebase';
import {
  FETCH_PROFILE_INFO,
  PROFILE_INPUT_CHANGE,
  LOAD,
  EDIT_PROFILE_SUCCESS
} from './types';

export const fetchUserProfileInfo = userId => dispatch => {

  firebase.database().ref(`/users/${userId}`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_PROFILE_INFO, payload: snapshot.val() });
    });
};

export const profileFormInputChange = ({ prop, value }) => {
  return {
    type: PROFILE_INPUT_CHANGE,
    payload: { prop, value }
  };
}

export const editProfile = (data, callback) => async dispatch => {
  dispatch({ type: LOAD });
  const { firstName, lastName, userId, about, img, location } = data;

  await firebase.database().ref(`users/${userId}`).update({ firstName, lastName, about, location });
  if (img) {
    const imageData = await firebase.storage().ref(`/users/${userId}`).put(img);
    const imageURL = imageData.metadata.downloadURLs[0];
    await firebase.database().ref(`users/${userId}`).update({ photo: imageURL });
  }
  dispatch({ type: EDIT_PROFILE_SUCCESS });
  callback();
}
