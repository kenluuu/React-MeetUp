import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui';

const ProfileCard = (props) => {
  const { firstName, lastName, location, about, photo } = props;
  return (
    <div>
      <Card id="profile-card">
        <img src={photo} alt="" width="100%" height="350px"/>
        <CardTitle
          title={`${firstName} ${lastName}`}
          subtitle={location || ''}
        />
        <CardText>
          {about || ''}
        </CardText>

      </Card>
    </div>
  );
};

export default ProfileCard;
