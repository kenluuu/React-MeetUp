import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import MeetupCard from './components/MeetupCard';
import PageShell from '../../components/common/PageShell';
import '../../styles/home-card.css';


class Home extends Component {
  componentDidMount() {
    const uid = localStorage.getItem('uid');
    this.props.fetchNotifications(uid);

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
export default connect(mapStateToProps, actions)(PageShell(Home))
