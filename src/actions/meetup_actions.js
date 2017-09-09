import firebase from 'firebase';
import {
  MEETUP_INPUT_CHANGE,
  CLEAR,
  CREATE_MEETUP_FAIL,
  LOAD,
  FETCH_MEETUPS,
  FETCH_MEETUP,
  FETCH_CREATOR
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
    const { key } = await firebase.database().ref(`/meetups`)
      .push({ name, description, location, date, time, creatorID: userId });
    const ext = img.name.slice(img.name.lastIndexOf('.'));
    const imageData = await firebase.storage().ref(`/meetups/${key}${ext}`).put(img);
    const imageURL = imageData.metadata.downloadURLs[0];
    await firebase.database().ref(`meetups/${key}`).update({ imageURL });
    callback();
    dispatch({ type: CLEAR });
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


export const fetchMeetups = () => dispatch => {
  firebase.database().ref('/meetups')
    .on('value', snapshot => {
      dispatch({ type: FETCH_MEETUPS, payload: snapshot.val()})
    });
};

export const fetchMeetup = uid => dispatch => {
  firebase.database().ref(`/meetups/${uid}`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_MEETUP, payload: snapshot.val() })
    });
};

export const fetchCreator = creatorID => dispatch => {
  firebase.database().ref(`/users/${creatorID}`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_CREATOR, payload: snapshot.val() })
    });
};
