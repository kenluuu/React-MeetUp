import firebase from 'firebase';
import {
  GOT_CURRENT_USER,
  INPUT_CHANGE,
  LOGIN_FAIL,
  SIGNUP_FAIL,
  LOAD,
  SIGNOUT,
  CLEAR
} from './types'

export const inputChange = ({ prop, value }) => {
  return {
    type: INPUT_CHANGE,
    payload: { prop, value }
  };
};

export const signupUser = ({ email, password, firstName, lastName }, callback) => async dispatch => {
  dispatch({ type: LOAD })
  try {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.database().ref(`users/${user.uid}/info`)
      .push({ firstName, lastName, userId: user.uid });
    localStorage.setItem('uid', user.uid);
    getCurrentUser(dispatch, user.uid);
    callback();
  } catch (err) {
    dispatch({ type: SIGNUP_FAIL });
  }
};

export const signinUser = ({email, password}, callback) => async dispatch => {
  dispatch({ type: LOAD });
  try {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    localStorage.setItem('uid', user.uid);
    getCurrentUser(dispatch, user.uid);
    callback()
  } catch(err) {
    dispatch({ type: LOGIN_FAIL});
  }

};

export const getCurrentUser = (dispatch, uid) => {
  firebase.database().ref(`/users/${uid}/info`)
    .on('value', snapshot => {
      const infoId = Object.keys(snapshot.val())[0];
      const { firstName, lastName, userId } = snapshot.val()[infoId];
      const user = { firstName, lastName, userId};
      // localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: GOT_CURRENT_USER, payload: user });
      dispatch({ type: CLEAR });
    });
};

export const signOut = () => {
  return {
    type: SIGNOUT
  };
};
