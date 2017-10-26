import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import * as actions from '../actions';
import firebase from 'firebase';


import config from '../config';
import Home from '../Pages/HomePage/Home';
import Auth from '../Pages/AuthPage/Auth';
import Navbar from './Navbar';
import CreateMeetup from '../Pages/CreateMeetupPage/CreateMeetup';
import Meetup from '../Pages/MeetupPage/Meetup';
import Profile from '../Pages/ProfilePage/Profile';

import '../styles/app.css';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp(config);

  }
  componentDidMount() {
    const uid = localStorage.getItem('uid');
    if (!this.props.user.userId && uid) {
      this.props.fetchCurrentUser(uid);
    }
    this.props.fetchMeetups();
    this.props.fetchNotifications(uid);
  }


  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <div>
            <Route path="/*" component={Navbar} />
            <Route exact path="/" component={Home} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/meetup/:id" component={Meetup} />
            <Route path="/auth" component={Auth} />
            <Route path="/create" component={CreateMeetup} />
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ user }) {

  return { user };
}

export default connect(mapStateToProps, actions)(App);
