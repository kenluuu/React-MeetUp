import firebase from 'firebase';
import {
  MEETUP_INPUT_CHANGE,
  CLEAR,
  CREATE_MEETUP_FAIL,
  LOAD,
  FETCH_MEETUPS,
  FETCH_MEETUP,
  FETCH_CREATOR,
  EDIT_MEETUP_SUCCESS,
  FETCH_ATTENDING_USERS
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

export const editMeetup = (meetupInfo, uid, callback) => async dispatch => {
  const { name, location, img, date, time, description } = meetupInfo;
  dispatch({ type: LOAD })
  await firebase.database().ref(`meetups/${uid}`)
    .update({ name, location, date, time, description});
  if(img) {
    await addPhoto(dispatch, uid, img);
  }
  callback();
  clearForm();
}

const validate = meetupInfo => {
  for (let key in meetupInfo) {
    if(!meetupInfo[key]) {
      return false;
    }
  }
  return true;
};

const addPhoto = async (dispatch, key, img) => {
  const imageData = await firebase.storage().ref(`/meetups/${key}`).put(img);
  const imageURL = imageData.metadata.downloadURLs[0];
  await firebase.database().ref(`meetups/${key}`).update({ imageURL });
}

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

export const clearForm = () => dispatch => {
  dispatch({ type: CLEAR });
  dispatch({ type: EDIT_MEETUP_SUCCESS });
};

export const fetchAttendingUsers = uid => dispatch => {
  firebase.database().ref(`/usersGoingToMeetups/${uid}`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_ATTENDING_USERS, payload: snapshot.val() });
    });
}

export const deleteMeetup = (uid, callback) => async dispatch => {
  await firebase.storage().ref(`/meetups/${uid}`).delete();
  await firebase.database().ref(`/meetups/${uid}`).remove();
  await firebase.database().ref(`/usersGoingToMeetups/${uid}`).remove();
  callback();
}

export const registerForMeetup = (uid, user) => async dispatch => {
  const { userId, firstName, lastName } = user;
  await firebase.database().ref(`/usersGoingToMeetups/${uid}/${userId}`)
    .set({ firstName, lastName });
}

export const unregisterForMeetup = (uid, userId) => async dispatch => {
  await firebase.database().ref(`/usersGoingToMeetups/${uid}/${userId}`).remove();
}
