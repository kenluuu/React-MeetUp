import firebase from 'firebase';
import {
  MEETUP_INPUT_CHANGE,
  CREATE_MEETUP_SUCCESSFUL,
  CREATE_MEETUP_FAIL,
  LOAD
} from './types';

export const meetupInputChange = ({ prop, value }) => {
  if (prop === 'time') {
    value = value.toLocaleTimeString();
  } else if (prop === 'date') {
    value = value.toLocaleDateString(['en-US'], {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
  return {
    type: MEETUP_INPUT_CHANGE,
    payload: { prop, value }
  };
};

export const createMeetup = (meetupInfo, userId, callback) => async dispatch => {
  const { name, location, img, date, time, description } = meetupInfo;
  if(validate(meetupInfo)) {
    dispatch({ type: LOAD })
    const { key } = await firebase.database().ref(`/meetups/${userId}`)
      .push({ name, description, location, date, time, creatorID: userId });
    const ext = img.name.slice(img.name.lastIndexOf('.'));
    const imageData = await firebase.storage().ref(`/meetups/${key}${ext}`).put(img);
    const imageURL = imageData.metadata.downloadURLs[0];
    const update = await firebase.database().ref(`meetups/${userId}/${key}`).update({ imageURL });
    callback();
    dispatch({ type: CREATE_MEETUP_SUCCESSFUL });
  } else {
    dispatch({ type: CREATE_MEETUP_FAIL });
  }
};

const validate = meetupInfo => {
  for (let key in meetupInfo) {
    if(!meetupInfo[key]) {
      return false;
    }
  }
  return true;
};
