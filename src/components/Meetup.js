import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, FlatButton, CircularProgress, FontIcon } from 'material-ui';
import * as actions from '../actions';
import '../styles/meetup-page.css';
class Meetup extends Component {
  componentDidMount() {
    const uid = this.props.match.params.id;
    const query = this.props.location.search;
    const creatorID = query.slice(query.lastIndexOf('=') + 1);
    this.props.fetchMeetup(uid);
    this.props.fetchCreator(creatorID);
    console.log(FontIcon);
  }
  render() {
    const { firstName, lastName, location, date, name, time, description, imageURL } = this.props.selectedMeetup;
    if (!this.props.selectedMeetup.firstName) {
      return (
        <div>
        </div>
      )
    }
    return(
      <div id="meetup-page-content">
        <Card id="meetup-page-card">
          <CardHeader
            title={[
              <span id="organizer" key="org">Organizer:</span>,
              `${firstName} ${lastName}`
            ]}
          />
          <img src={imageURL} width='100%'/>
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
  }
}
function mapStateToProps({ selectedMeetup }) {
  console.log(selectedMeetup);
  return { selectedMeetup };
}
export default connect(mapStateToProps, actions)(Meetup);
