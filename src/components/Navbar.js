import React, { Component } from 'react';
import { AppBar, FlatButton } from 'material-ui';
import { connect } from 'react-redux';
import * as actions from '../actions'
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash';
import '../styles/navbar.css'

class Navbar extends Component {
  onSignOut() {
    localStorage.removeItem('uid');
    this.props.signOut();
  }
  renderAuth() {
    if (localStorage.getItem('uid')) {
        return (
          <div>
            <Link to="/create">
              <FlatButton className="btn" label="Create Event" style={{ color: 'white'}}/>
            </Link>
            <Link to="/auth">
              <FlatButton onClick={this.onSignOut.bind(this)} className="btn" label="Sign Out" style={{ color: 'white'}}/>
            </Link>
          </div>
        );

    }
    else if(_.isEmpty(this.props.user)) {
      return (
        <Link to="/auth"><FlatButton className="btn" label="Sign In" style={{ color: 'white'}}/></Link>
      );
    }
  }
  render() {
    return(
      <div>
        <AppBar style={{ position: 'fixed'}}>
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
