import React, { Component } from 'react';
import { AppBar, FlatButton } from 'material-ui';
import { connect } from 'react-redux';
import * as actions from '../actions'
import { Link } from 'react-router-dom';
import _ from 'lodash';
import '../styles/navbar.css'

class Navbar extends Component {
  onSignOut() {
    localStorage.removeItem('uid');
    this.props.signOut();
  }
  renderAuth() {
    if(_.isEmpty(this.props.user)) {
      return (
        <Link to="/auth"><FlatButton className="btn" label="Sign In" style={{ color: 'white'}}/></Link>
      );
    }
    return (
      <Link to="/">
        <FlatButton onClick={this.onSignOut.bind(this)} className="btn" label="Sign Out" style={{ color: 'white'}}/>
      </Link>
    );
  }
  render() {
    return(
      <div>
        <AppBar>
          <div id="button-layout">
            <Link id="home" to="/"><FlatButton className="btn" label="Home" style={{ color: 'white'}}/></Link>
            {this.renderAuth()}
          </div>
        </AppBar>
      </div>
    );
  }
};

function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps, actions)(Navbar);
