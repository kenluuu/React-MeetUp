import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import * as actions from '../actions';
import { TextField, RaisedButton } from 'material-ui';
import '../styles/signin.css';
class Auth extends Component {
  constructor() {
    super();
    this.state = { show: false };
  }

  onClick() {
    this.setState({ show: !this.state.show})
  }
  renderCreate() {
    return (
      <p id="create" onClick={this.onClick.bind(this)}>Create New Account</p>
    )
  }
  renderSignin() {
    return (
      <p id="create" onClick={this.onClick.bind(this)}>Sign In</p>
    )
  }
  renderRegisterBtn() {
    return (
      <RaisedButton
        primary={true}
        label="Create Account"
        style={styles.btnStyle}
        onClick={this.onRegisterClick.bind(this)}
      />
    );
  }

  renderSigninBtn() {
    return (
      <RaisedButton
        primary={true}
        label="Sign In"
        style={styles.btnStyle}
        onClick={this.onSigninClick.bind(this)}
      />
    );
  }

  onRegisterClick() {
    const { email, password } = this.props;
    this.props.signupUser({ email, password });
  }

  onSigninClick() {
    const { email, password } = this.props;
    this.props.signinUser({ email, password }, () => {
      this.props.history.push('');
    });
  }

  render() {

    const show = `${this.state.show ? 'block' : 'none'}`;
    const sign = `${this.state.show ? 'Register' : 'Sign In'}`;
    return(
      <div id="content">

        <TextField
          hintText="First Name"
          style={{ display: show }}
          floatingLabelText="Please Enter First Name"
          onChange={(event, value) => this.props.inputChange({ prop: 'firstName', value })}
          value={this.props.firstName}
        />
        <br />
        <TextField
          hintText="Last Name"
          style={{display: show}}
          floatingLabelText="Please Enter Your Last Name"
          onChange={(event, value) => this.props.inputChange({ prop: 'lastName', value })}
          value={this.props.lastName}
        />
        <br />
        <TextField
          hintText="Email"
          floatingLabelText="Please Enter Your Email"
          onChange={(event, value) => this.props.inputChange({ prop: 'email', value })}
          value={this.props.email}
        />
        <br />
        <TextField
          hintText="Password"
          type="password"
          floatingLabelText="Please Enter Your Password"
          onChange={(event, value) => this.props.inputChange({ prop: 'password', value })}
          value={this.props.password}
        />

        {this.state.show ? this.renderRegisterBtn() : this.renderSigninBtn()}
        <br />

        {this.state.show ? this.renderSignin() : this.renderCreate()}
      </div>
    )
  }
}
function mapStateToProps({ auth }) {
  const { firstName, lastName, email, password, user } = auth;
  return { firstName, lastName, email, password, user };
}
const styles = {
  btnStyle: {
    marginTop: '15px'
  }
};
export default connect(mapStateToProps, actions )(Auth);
