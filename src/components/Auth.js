import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { TextField, RaisedButton, CircularProgress } from 'material-ui';
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
        disabled={this.props.loading}
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
        disabled={this.props.loading}
      />
    );
  }

  onRegisterClick() {
    const { email, password, firstName, lastName } = this.props;
    this.props.signupUser({ firstName, lastName, email, password }, () => {
      this.props.history.push('/');
    });
  }

  onSigninClick() {
    const { email, password } = this.props;
    this.props.signinUser({ email, password }, () => {
      this.props.history.push('/');
    });
  }

  renderSpinner() {
    if (this.props.loading) {
      return(
        <CircularProgress />
      );
    }
  }

  render() {
    const show = `${this.state.show ? 'block' : 'none'}`;
    return(
      <div id="content">
        <TextField
          hintText="First Name"
          style={{ display: show }}
          floatingLabelText="Please Enter First Name"
          disabled={this.props.loading}
          onChange={(event, value) => this.props.inputChange({ prop: 'firstName', value })}
          value={this.props.firstName}
        />
        <br />
        <TextField
          hintText="Last Name"
          disabled={this.props.loading}
          style={{display: show}}
          floatingLabelText="Please Enter Your Last Name"
          onChange={(event, value) => this.props.inputChange({ prop: 'lastName', value })}
          value={this.props.lastName}
        />
        <br />
        <TextField
          hintText="Email"
          disabled={this.props.loading}
          floatingLabelText="Please Enter Your Email"
          onChange={(event, value) => this.props.inputChange({ prop: 'email', value })}
          value={this.props.email}
        />
        <br />
        <TextField
          hintText="Password"
          disabled={this.props.loading}
          type="password"
          floatingLabelText="Please Enter Your Password"
          onChange={(event, value) => this.props.inputChange({ prop: 'password', value })}
          value={this.props.password}
        />

        {this.state.show ? this.renderRegisterBtn() : this.renderSigninBtn()}
        <br />
        <span id="error">{this.props.error}</span>
        {this.renderSpinner()}
        {this.state.show ? this.renderSignin() : this.renderCreate()}
      </div>
    )
  }
}
function mapStateToProps({ auth }) {
  const { firstName, lastName, email, password, error, loading } = auth;
  return { firstName, lastName, email, password, error, loading };
}
const styles = {
  btnStyle: {
    marginTop: '15px'
  }
};
export default connect(mapStateToProps, actions )(Auth);
