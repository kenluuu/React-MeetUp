import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import '../styles/signin.css';
class SignIn extends Component {
  render() {
    return(
      <div id="content">
        <br />
        <TextField
          hintText="Email"
          floatingLabelText="Please Enter Your Email"
        />
        <br />
        <TextField
          hintText="Password"
          type="password"
          floatingLabelText="Please Enter Your Password"
        />
        <RaisedButton
          primary={true}
          label="Sign In"
          style={styles.btnStyle}
        />
        <br />
      </div>
    )
  }
}

const styles = {
  btnStyle: {
    marginTop: '15px'
  }
};
export default SignIn;
