import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Form from '../../components/common/Form';
import MeetupForm from '../../components/common/MeetupForm';
import '../../styles/create-meetups.css';

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
    const { loading, error, name, location, description } = this.props.meetupInfo;
    const { meetupInputChange } = this.props;
    return (
      <div id="create-meetup-content" className="center">
        <Form loading={loading} path={this.props.match.path}>
          <MeetupForm
            loading={loading} meetupInputChange={meetupInputChange} error={error}
            name={name} location={location} description={description}
           />
        </Form>
        <RaisedButton
          primary
          label="Create Event"
          style={{ marginTop: '30px' }}
          onClick={this.onCreateMeetup.bind(this)}
          disabled={this.props.meetupInfo.loading}
        />
      </div>
    );
  }
}

function mapStateToProps({ meetupInfo, user }) {
  return { meetupInfo, user };
}


export default connect(mapStateToProps, actions)(CreateMeetup);
