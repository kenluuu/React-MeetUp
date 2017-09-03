import firebase from 'firebase';
import {
  USER_CREATE_SUCCESSFUL,
  USER_SIGNIN_SUCCESSFUL,
  GET_CURRENT_USER_ID,
  INPUT_CHANGE
} from './types'

export const inputChange = ({ prop, value }) => {
  return {
    type: INPUT_CHANGE,
    payload: { prop, value }
  };
};

export const signupUser = ({ email, password }) => async dispatch => {
  try {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    localStorage.setItem('uid', user.uid)
    dispatch({ type: USER_CREATE_SUCCESSFUL, payload: user });
  } catch (err) {
    alert(err);
  }
};

export const signinUser = ({email, password}, callback) => async dispatch => {
  try {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    localStorage.setItem('uid', user.uid)
    dispatch({ type: USER_SIGNIN_SUCCESSFUL, payload: user });
    callback()
  } catch(err) {
    alert(err);
  }

};

export const getCurrentUserID = uid => {
  return {
    type: GET_CURRENT_USER_ID,
    payload: uid
  };
};
