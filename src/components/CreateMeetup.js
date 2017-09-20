import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MeetupForm from './MeetupForm';
import '../styles/create-meetups.css';

class CreateMeetup extends Component {
  onCreateMeetup() {
    const { name, location, img, date, time, description } = this.props.meetupInfo;
    this.props.createMeetup(
      { name, location, img, date, time, description },
      this.props.user,
      () => this.props.history.push('/')
    );
  }

  componentWillUnmount() {
    this.props.clearForm();
  }

  render() {
    return (
      <div id="create-meetup-content">
        <MeetupForm meetupInfo={this.props.meetupInfo}>
          <RaisedButton
            primary
            label="Create Event"
            style={{ marginTop: '30px' }}
            onClick={this.onCreateMeetup.bind(this)}
            disabled={this.props.meetupInfo.loading}
          />
        </MeetupForm>
      </div>
    );
  }
}

function mapStateToProps({ meetupInfo, user }) {
  
  return { meetupInfo, user };
}


export default connect(mapStateToProps, actions)(CreateMeetup);
