import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import _ from 'lodash';
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
            <Navbar notifications={this.props.notifications} />
            <Switch>
              <Route path="/profile/:id" component={Profile} />
              <Route path="/meetup/:id" component={Meetup} />
              <Route path="/auth" component={Auth} />
              <Route path="/create" component={CreateMeetup} />
              <Route exact path="/" component={Home} />
              <Route path="/*" component={Home}/>
            </Switch>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ user, notifications }) {
  notifications = _.map(notifications, (value, uid) => {
    return { ...value, uid };
  });
  return { user, notifications };
}

export default connect(mapStateToProps, actions)(App);
