import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Card, CardHeader, CardTitle, CardText, FontIcon, IconMenu, MenuItem, Dialog, RaisedButton } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MeetupForm from './MeetupForm';
import * as actions from '../actions';
import '../styles/meetup-page.css';

class Meetup extends Component {
  state = { open: false, attending: false, delete: false };
  componentDidMount() {
    const uid = this.props.match.params.id;
    const query = this.props.location.search;
    const creatorID = query.slice(query.lastIndexOf('=') + 1);
    this.props.fetchMeetup(uid);
    this.props.fetchCreator(creatorID);
    this.props.fetchAttendingUsers(uid);
  }

  renderIconMeun() {
    if (this.props.selectedMeetup.creatorID === this.props.user.userId) {
      return (
        <div id="icon-menu">
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
           >
             <MenuItem  primaryText="Edit Event" onClick={() => this.setState({ open: true })} />
             <MenuItem primaryText="Delete Event" onClick={() => this.setState({ delete: true })} />
           </IconMenu>
        </div>
      );
    }
  }
  renderDelete() {
    return(
      <Dialog
         title="Delete Meetup?"
         open={this.state.delete}
         onRequestClose={() => this.setState({ delete: false })}
         actions={[
           <RaisedButton
             label="Cancel"
             primary={true}
             onClick={() => this.setState({ delete: false })}
          />,
          <RaisedButton
             label="Delete"
             secondary
             onClick={(this.onDeleteMeetup.bind(this))}
           />
         ]}
       >
      Are you sure you want to delete this event?
      </Dialog>
    )
  }
  onDeleteMeetup() {
    const uid = this.props.match.params.id;
    this.props.deleteMeetup(uid, () => this.props.history.push('/'));
  }

  handleClose() {
    this.setState({ open: false });
    this.props.clearForm();
    const uid = this.props.match.params.id;
    this.props.fetchMeetup(uid);
  }

  onEditMeetup() {
    const uid = this.props.match.params.id;
    const { name, location, img, date, time, description } = this.props.selectedMeetup;
    this.props.editMeetup({ name, location, img, date, time, description}, uid, this.handleClose.bind(this));
  }

  renderMeetupForm() {
    return (
      <Dialog
        modal={this.props.selectedMeetup.loading}
        open={this.state.open}
        onRequestClose={this.handleClose.bind(this)}
        autoScrollBodyContent={true}
      >
        <MeetupForm style={styles.meetupForm} selectedMeetup={this.props.selectedMeetup}>
          <RaisedButton
            onClick={this.onEditMeetup.bind(this)}
            primary
            label="Edit Event"
            style={{ marginTop: '30px' }}
            disabled={this.props.selectedMeetup.loading}
          />
        </MeetupForm>
      </Dialog>
    )
  }

  renderAttending() {
    return (
      <Dialog
        open={this.state.attending}
        onRequestClose={() => this.setState({ attending: false })}
        autoScrollBodyContent={true}
      >
        {this.props.usersAttendingMeetupArray.map(user => {

          return (
            <Link to={`/profile/${user.uid}`} key={user.uid} id="attending-link">
              <p id="attending-item">
                <img id="attending-img" src={user.photo} alt="" />
                <span id="attending-name">{user.firstName} {user.lastName}</span>

              </p>
            </Link>
          )
        })}
      </Dialog>
    )
  }

  renderRegBtn() {
    const uid = this.props.match.params.id;
    const { creatorID } = this.props.selectedMeetup;
    const { userId, firstName, lastName, photo } = this.props.user;


    if (creatorID === userId) {
        return <div></div>;
    } else if (this.props.usersAttendingMeetup[userId]) {
      return <RaisedButton label="Unregister" secondary style={styles.regBtn} onClick={() => this.props.unregisterForMeetup(uid, userId, creatorID)}/>
    } else {
      return <RaisedButton label="Register" secondary style={styles.regBtn} onClick={() => this.props.registerForMeetup(uid, creatorID, { firstName, lastName, userId, photo })} />
    }
  }

  render() {
    if (!this.props.selectedMeetup.name) {
      return (
        <div>
        </div>
      );
    }

    const { firstName, lastName, location, date, name, time, description, imageURL } = this.props.selectedMeetup;

    return(
      <div id="meetup-page-content">
        <Card id="meetup-page-card">
          {this.renderIconMeun()}
          {this.renderMeetupForm()}
          {this.renderAttending()}
          {this.renderDelete()}
          <CardHeader
            title={[
              <span id="organizer" key="org">Organizer:</span>,
              `${firstName} ${lastName}`
            ]}
          />
          <img src={imageURL} width='100%' alt="" />
          {this.renderRegBtn()}
          <CardText style={{ paddingTop: '0', paddingBottom: '0' }}>
            <p id="users-going" onClick={() => this.setState({ attending: true })}> Attending: {this.props.usersAttendingMeetupArray.length} </p>
          </CardText>
          <CardTitle
            title={name}
            style={styles.cardTitle}
          />
          <CardTitle
            title={[
              <FontIcon className="material-icons" style={styles.fontIcon} key="time">access_time</FontIcon>,
              <span id="date" key="date">{date}</span>
            ]}
            subtitle={<span id="time"> {time} </span>}
            style={styles.cardTitle}
          />
          <CardTitle
            style={styles.cardTitle}
            title={[
              <FontIcon className="material-icons" style={styles.fontIcon} key="place">place</FontIcon>,
              <span id="location" key="location">{location}</span>
            ]}
          />
          <CardText>
            {description}
          </CardText>
        </Card>
      </div>
    )
  }
}

const styles = {
  cardTitle: {
    paddingTop: '5px',
    paddingBottom: '5px'
  },
  fontIcon: {
    position: 'relative',
    top: '10px'
  },
  cardTitleText: {
    marginLeft: '10px'
  },
  meetupForm: {
    position: 'relative',
    top: '0'
  },
  regBtn: {
    marginLeft: '15px',
    marginTop: '15px',
    marginBottom: '5px'
  }
};

function mapStateToProps({ selectedMeetup, user, usersAttendingMeetup }) {
  const usersAttendingMeetupArray = _.map(usersAttendingMeetup, (users, uid) => {
    return { ...users, uid };

  });
  return { selectedMeetup, user, usersAttendingMeetup, usersAttendingMeetupArray };
}
export default connect(mapStateToProps, actions)(Meetup);
