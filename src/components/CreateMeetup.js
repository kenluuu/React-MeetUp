import React, { Component } from 'react';
import { TextField, RaisedButton, DatePicker, TimePicker, CircularProgress } from 'material-ui';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../styles/create-meetups.css';
class CreateMeetup extends Component {
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
    if (this.props.meetupInfo.img) {
      return <img id="img" src={this.state.imgURL} />
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
  onCreateMeetup() {
    const { name, location, img, date, time, description } = this.props.meetupInfo;
    this.props.createMeetup(
      { name, location, img, date, time, description },
      this.props.user.userId,
      () => this.props.history.push('/')
    );
  }
  renderSpinner() {
    if (this.props.meetupInfo.loading) {
      return(
        <CircularProgress />
      );
    }
  }
  render() {
    return (
      <div id="meetup-form">
        <TextField
          hintText="Event Name"
          floatingLabelText="Enter Name Of The Event"
          onChange={(event, value) => this.props.meetupInputChange({ prop: 'name', value })}
        /><br />
        <TextField
          hintText="Description"
          floatingLabelText="Enter Description For Event"
          multiLine={true}
          rows={2}
          onChange={(event, value) => this.props.meetupInputChange({ prop: 'description', value })}
        /><br />
        <TextField
          hintText="Location"
          floatingLabelText="Enter The Location Of The Event"
          onChange={(event, value) => this.props.meetupInputChange({ prop: 'location', value })}

        /><br />
        <RaisedButton
          primary
          label="upload image"
          onClick={this.onClick.bind(this)}
        />
        <input type="file" id="input" onChange={this.onUpload.bind(this)}/><br />
        {this.renderImg()}
        <h1 className="when">Pick A Date</h1>
        <DatePicker
          hintText="Date"
          formatDate={this.formatDate}
          onChange={(event, value) => this.props.meetupInputChange({ prop: 'date', value })}
        />
        <h1 className="when">Pick A Time</h1>
        <TimePicker
         hintText="Time"
         autoOk={true}
         onChange={(event, value) => this.props.meetupInputChange({ prop: 'time', value })}
       />
       <span id="error" style={{ marginTop: '15px' }}>{this.props.meetupInfo.error}</span>
       {this.renderSpinner()}
       <RaisedButton
         primary
         label="Create Event"
         style={{ marginTop: '30px' }}
         onClick={this.onCreateMeetup.bind(this)}
       />
      </div>
    );
  }
}

function mapStateToProps({ meetupInfo, user }) {
  return { meetupInfo, user };
}


export default connect(mapStateToProps, actions)(CreateMeetup);
