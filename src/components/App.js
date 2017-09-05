import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { CircularProgress } from 'material-ui';
import { connect } from 'react-redux';
import * as actions from '../actions';
import firebase from 'firebase';

import config from '../config';
import Home from './Home';
import Auth from './Auth';
import Navbar from './Navbar';
import '../styles/app.css';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp(config);

  }
  renderSpinner() {
    console.log('fdsf');
    return (
      <div></div>
    );
  }

  renderApp() {
    return (
      <div>
        <BrowserRouter>
          <MuiThemeProvider>
            <div>
              <Navbar />
              <Route path="/auth" component={Auth} />
              <Route exact path="/" component={Home} />
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
  render() {
    if(localStorage.getItem('uid')) {
      return this.renderSpinner();
    }
    {this.renderApp()}
  }
}
function mapStateToProps({ user }) {
  console.log(user);
  return { user };
}
export default connect(mapStateToProps, actions)(App);
