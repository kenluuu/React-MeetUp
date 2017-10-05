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
const defaultProfileImg = 'http://valleyosteopathy.com.au/wp-content/uploads/2013/11/facebook-default-no-profile-pic1-e1478228271928.jpg'

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
      .set({ firstName, lastName, userId: user.uid, photo: defaultProfileImg, notificationLength: 0, location: '', about: '' });
    localStorage.setItem('uid', user.uid);
    localStorage.setItem('noteLength', 0);
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
      localStorage.setItem('noteLength', user.notificationLength);
      dispatch({ type: GOT_CURRENT_USER, payload: user });
      dispatch({ type: CLEAR });
    })
};
