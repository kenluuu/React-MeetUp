import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  render() {
    const show = `${this.state.show ? 'block' : 'none'}`;
    const sign = `${this.state.show ? 'Register' : 'Sign In'}`;
    return(
      <div id="content">

        <TextField
          hintText="First Name"
          style={{ display: show }}
          floatingLabelText="Please Enter First Name"
          onChange={(event, value) => this.props.firstNameChange(value)}
          value={this.props.firstName}
        />
        <br />
        <TextField
          hintText="Last Name"
          style={{display: show}}
          floatingLabelText="Please Enter Your Last Name"
          onChange={(event, value) => this.props.lastNameChange(value)}
          value={this.props.lastName}
        />
        <br />
        <TextField
          hintText="Email"
          floatingLabelText="Please Enter Your Email"
          onChange={(event, value) => this.props.emailChange(value)}
          value={this.props.email}
        />
        <br />
        <TextField
          hintText="Password"
          type="password"
          floatingLabelText="Please Enter Your Password"
          onChange={(event, value) => this.props.passwordChange(value)}
          value={this.props.password}
        />

        <RaisedButton
          primary={true}
          label={sign}
          style={styles.btnStyle}
        />
        <br />

        {this.state.show ? this.renderSignin() : this.renderCreate()}
      </div>
    )
  }
}
function mapStateToProps({ auth }) {  
  const { firstName, lastName, email, password } = auth;
  return { firstName, lastName, email, password };
}
const styles = {
  btnStyle: {
    marginTop: '15px'
  }
};
export default connect(mapStateToProps, actions )(Auth);
