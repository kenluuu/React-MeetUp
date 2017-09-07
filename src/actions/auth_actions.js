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
    await firebase.database().ref(`/users/${user.uid}`)
      .set({ firstName, lastName, userId: user.uid });
    localStorage.setItem('uid', user.uid);
    getUser(dispatch, user.uid);
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
    getUser(dispatch, user.uid);
    callback()
  } catch(err) {
    dispatch({ type: LOGIN_FAIL});
  }

};

const getUser = (dispatch, uid) => {
  getUserFromFirebase(dispatch, uid);
};

export const fetchCurrentUser = uid => dispatch => {
  console.log('fetching user');
  getUserFromFirebase(dispatch, uid);
}

export const signOut = () => {
  return {
    type: SIGNOUT
  };
};

const getUserFromFirebase = (dispatch, uid) => {
  firebase.database().ref(`/users/${uid}`)
    .on('value', snapshot => {
      const user = snapshot.val();
      dispatch({ type: GOT_CURRENT_USER, payload: user });
      dispatch({ type: CLEAR });
    })
};
