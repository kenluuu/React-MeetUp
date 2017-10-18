import React from 'react';
import { TextField, RaisedButton } from 'material-ui';
const ProfileEditForm = (props) => {

  const {
    imgURL, photo, loading, profileFormInputChange, location,
    about, firstName, lastName, onEditClick, onClick, renderSpinner, onUpload
  } = props;
  return (
    <div id="profile-edit-form">
      <div id="profile-edit-form-content">
        <img src={ imgURL || photo } alt="" width="200px" height="200px"/>
        <RaisedButton
          primary
          label="Change Profile Image"
          onClick={onClick}
          disabled={loading}
        />
        <input type="file" id="input" onChange={onUpload}/><br />
        <TextField
          hintText="First Name"
          floatingLabelText="Enter First Name"
          value={firstName}
          onChange={(event, value) => profileFormInputChange({ prop: 'firstName', value })}
          disabled={loading}
        /><br />
        <TextField
          hintText="Last Name"
          floatingLabelText="Enter Last Name"
          value={lastName}
          onChange={(event, value) => profileFormInputChange({ prop: 'lastName', value })}
          disabled={loading}
        /><br />
        <TextField
          hintText="Location"
          floatingLabelText="Enter Location"
          value={location || ''}
          onChange={(event, value) => profileFormInputChange({ prop: 'location', value })}
          disabled={loading}
        /><br />
        <TextField
          multiLine={true}
          rows={2}
          hintText="About"
          floatingLabelText="Tell Us About Yourself"
          value={about || ''}
          onChange={(event, value) => profileFormInputChange({ prop: 'about', value })}
          disabled={loading}
        /><br />
        {renderSpinner()}
        <RaisedButton label="Edit Profile" onClick={onEditClick} disabled={loading} secondary />
      </div>
    </div>
  );
};

export default ProfileEditForm;
