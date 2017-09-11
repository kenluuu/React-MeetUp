import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui';
import '../styles/home-card.css';
const MeetupCard = (props) => {
  return (
    <Card style={styles.cardStyle} id="home-card" onClick={() => props.history.push(`/meetup/${props.meetup.uid}?user=${props.meetup.creatorID}`)}>
      <CardTitle title={props.meetup.name} subtitle={[props.meetup.date,' ',props.meetup.time]} />
      <img src={props.meetup.imageURL} width="100%" height="400px" alt="" />
      <CardText>
        {props.meetup.description}
      </CardText>
    </Card>
  )
};

const styles = {

};

export default MeetupCard;
