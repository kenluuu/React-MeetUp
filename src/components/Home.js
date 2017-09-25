import React, { Component } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MeetupCard from './MeetupCard';


class Home extends Component {
  componentDidMount() {
    this.props.fetchMeetups()
  }
  renderMeetups() {
    return this.props.meetups.map(meetup =>
      <MeetupCard
        meetup={meetup}
        key={meetup.uid}
        history={this.props.history}
      />
    );
  }
  render() {
    return (
      <div id="home-content">
        {this.renderMeetups()}
      </div>
    )
  }
}

function mapStateToProps({ meetups }) {
  meetups = _.map(meetups, (meetup, uid) => {
    return { ...meetup, uid };
  });
  return { meetups };
}
export default connect(mapStateToProps, actions)(Home);
