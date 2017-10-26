import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RaisedButton, CircularProgress } from 'material-ui';
import Register from './components/Register';
import Login from './components/Login';
import * as actions from '../../actions';
import PageShell from '../../components/common/PageShell';

import '../../styles/signin.css';
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
    const { firstName, lastName, loading, email, password, inputChange } = this.props;
    return(
      <div id="content">
        <Register show={show} firstName={firstName} lastName={lastName} loading={loading} inputChange={inputChange} />
        <Login email={email} password={password} loading={loading} inputChange={inputChange} />
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
export default connect(mapStateToProps, actions )(PageShell(Auth));
