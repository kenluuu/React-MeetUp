import firebase from 'firebase';
import { MEETUP_INPUT_CHANGE, CREATE_MEETUP } from './types';


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

export const createMeetup = (meetupInfo, userId) => async dispatch => {
  const { name, location, img, date, time, description } = meetupInfo;
  const { key } = await firebase.database().ref(`/meetups/${userId}`)
    .push({ name, description, location, date, time, creatorID: userId });
  const ext = img.name.slice(img.name.lastIndexOf('.'));
  const imageData = await firebase.storage().ref(`/meetups/${key}${ext}`).put(img);
  const imageURL = imageData.metadata.downloadURLs[0];
  console.log(imageURL);
  const update = await firebase.database().ref(`meetups/${userId}/${key}`).update({ imageURL });
  console.log(update);
  return {
    type: CREATE_MEETUP
  };
};
