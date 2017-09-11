import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardTitle, CardText, FontIcon, IconMenu, MenuItem, Dialog, RaisedButton } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MeetupForm from './MeetupForm';
import * as actions from '../actions';
import '../styles/meetup-page.css';
class Meetup extends Component {
  state = { open: false };
  componentDidMount() {
    const uid = this.props.match.params.id;
    const query = this.props.location.search;
    const creatorID = query.slice(query.lastIndexOf('=') + 1);
    this.props.fetchMeetup(uid);
    this.props.fetchCreator(creatorID);

  }

  renderIconMeun() {
    if (this.props.selectedMeetup.creatorID === this.props.user.userId) {
      return (
        <div id="icon-menu">
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
           >
             <MenuItem value="1" primaryText="Edit Event" onClick={() => this.setState({ open: true })} />
           </IconMenu>
        </div>
      );
    }
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

  renderDialog() {
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
          {this.renderDialog()}
          <CardHeader
            title={[
              <span id="organizer" key="org">Organizer:</span>,
              `${firstName} ${lastName}`
            ]}
          />
          <img src={imageURL} width='100%' alt=""/>
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
  }
};

function mapStateToProps({ selectedMeetup, user }) {
  console.log(selectedMeetup);
  return { selectedMeetup, user };
}
export default connect(mapStateToProps, actions)(Meetup);
