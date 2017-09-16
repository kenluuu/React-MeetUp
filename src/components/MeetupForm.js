import React, { Component } from 'react';
import { TextField, RaisedButton, DatePicker, TimePicker, CircularProgress } from 'material-ui';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../styles/create-meetups.css';

class MeetupForm extends Component {
  state = { imgURL: null }
  onClick() {
    const input = document.getElementById('input');
    input.click();
  }
  onUpload(event) {
    const file = event.target.files;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file[0]);
    fileReader.onload = () => {
      this.props.meetupInputChange({ prop: 'img', value: file[0] })
      this.setState({ imgURL: fileReader.result });
    };
  }
  renderImg() {
    if (this.state.imgURL) {
      return <img id="img" src={this.state.imgURL} alt="" />
    }
  }

  formatDate(data) {
    return data.toLocaleDateString(['en-US'], {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }
    );
  }

  renderSpinner() {
    const { loading } = this.props.meetupInfo || this.props.selectedMeetup;
    if (loading) {
      return(
        <CircularProgress />
      );
    }
  }

  render() {
    const { name, location, description, loading, error } = this.props.meetupInfo || this.props.selectedMeetup;
    return (
      <div id="meetup-form">
        <TextField
          hintText="Event Name"
          floatingLabelText="Enter Name Of The Event"
          onChange={(event, value) => this.props.meetupInputChange({ prop: 'name', value })}
          disabled={loading}
          value={name}
        /><br />
        <TextField
          hintText="Description"
          floatingLabelText="Enter Description For Event"
          multiLine={true}
          rows={2}
          onChange={(event, value) => this.props.meetupInputChange({ prop: 'description', value })}
          disabled={loading}
          value={description}
        /><br />
        <TextField
          hintText="Location"
          floatingLabelText="Enter The Location Of The Event"
          onChange={(event, value) => this.props.meetupInputChange({ prop: 'location', value })}
          disabled={loading}
          value={location}
        /><br />
        <RaisedButton
          primary
          label="upload image"
          onClick={this.onClick.bind(this)}
          disabled={loading}
        />
        <input type="file" id="input" onChange={this.onUpload.bind(this)}/><br />
        {this.renderImg()}
        <h1 className="when">Pick A Date</h1>
        <DatePicker
          hintText="Date"
          formatDate={this.formatDate}
          onChange={(event, value) => this.props.meetupInputChange({ prop: 'date', value })}
          disabled={loading}
        />
        <h1 className="when">Pick A Time</h1>
        <TimePicker
         hintText="Time"
         autoOk={true}
         onChange={(event, value) => this.props.meetupInputChange({ prop: 'time', value })}
         disabled={loading}
       />
       <span id="error" style={{ marginTop: '15px' }}>{error}</span>
       {this.renderSpinner()}
       {this.props.children}
      </div>
    )
  }
}

export default connect(null, actions)(MeetupForm);
