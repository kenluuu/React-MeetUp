import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import * as actions from '../actions';
import firebase from 'firebase';

import config from '../config';
import Home from './Home';
import SignIn from './SignIn';
import Auth from './Auth';
import Navbar from './Navbar';
import '../styles/app.css';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp(config);
    console.log(localStorage.getItem('uid'));
    this.props.getCurrentUserID(localStorage.getItem('uid'));
  }
  render() {
    return (
      <div>
          <BrowserRouter>
            <MuiThemeProvider>
              <div>
                <Navbar />
                <Route path="/signin" component={SignIn}/>
                <Route path="/auth" component={Auth} />
                <Route exact path="/" component={Home} />
              </div>
            </MuiThemeProvider>
          </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
