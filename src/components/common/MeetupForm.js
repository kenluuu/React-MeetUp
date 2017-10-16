import React from 'react';
import { TextField, RaisedButton, DatePicker, TimePicker } from 'material-ui';

const MeetupForm = (props) => {
  const { loading, meetupInputChange, renderImg, renderSpinner, onClick, onUpload, error } = props;
  return (
    <div className="center">
      <TextField
        hintText="Event Name"
        floatingLabelText="Enter Name Of The Event"
        onChange={(event, value) => meetupInputChange({ prop: 'name', value })}
        disabled={loading}

      /><br />
      <TextField
        hintText="Description"
        floatingLabelText="Enter Description For Event"
        multiLine={true}
        rows={2}
        onChange={(event, value) => meetupInputChange({ prop: 'description', value })}
        disabled={loading}

      /><br />
      <TextField
        hintText="Location"
        floatingLabelText="Enter The Location Of The Event"
        onChange={(event, value) => meetupInputChange({ prop: 'location', value })}
        disabled={loading}

      /><br />
      <RaisedButton
        primary
        label="upload image"
        onClick={onClick}
        disabled={loading}
      /><br/>
      <input type="file" id="input" onChange={onUpload}/><br />
      {renderImg()}
      <h1 className="when">Pick A Date</h1>
      <DatePicker
        hintText="Date"
        formatDate={this.formatDate}
        onChange={(event, value) => meetupInputChange({ prop: 'date', value })}
        disabled={loading}
      />
      <h1 className="when">Pick A Time</h1>
      <TimePicker
       hintText="Time"
       autoOk={true}
       onChange={(event, value) => meetupInputChange({ prop: 'time', value })}
       disabled={loading}
     />
     <span id="error" style={{ marginTop: '15px' }}>{error}</span>
     {renderSpinner()}
    </div>
  );
};

export default MeetupForm;
