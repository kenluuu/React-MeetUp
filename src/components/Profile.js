import React, { Component } from 'react';
import { Card, CardTitle, CardText, FlatButton, Tabs, Tab, TextField, RaisedButton, CircularProgress } from 'material-ui';
import SwipeableViews from 'react-swipeable-views';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../styles/profile.css'
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { slideIndex: 0, imgURL: '' };
  }

  onClick() {
    const input = document.getElementById('input');
    input.click();
  }

  renderImg() {
    if (this.state.imgURL) {
      return <img id="img" src={this.state.imgURL} alt="" />
    }
  }
  onUpload(event) {
    const file = event.target.files;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file[0]);
    fileReader.onload = () => {
      this.props.profileFormInputChange({ prop: 'img', value: file[0] })
      this.setState({ imgURL: fileReader.result });
    };
  }
  handleChange = value => {
    this.setState({ slideIndex: value });
  }
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.fetchUserProfileInfo(userId);
  }
  onEditClick() {
    const { firstName, lastName, about, location, img } = this.props.profile;
    const userId = this.props.match.params.id;
    this.props.editProfile({ firstName, lastName, about, location, img, userId }, () => this.setState({ slideIndex: 0 }));
  }

  renderSpinner() {
    const { loading } = this.props.profile;
    if (loading) {
      return(
        <CircularProgress />
      );
    }
  }
  renderEditForm() {
    const { firstName, lastName, loading } = this.props.profile;
    return (
      <div id="profile-edit-form">
        <div id="profile-edit-form-content">
          <img src={this.props.profile.photo || this.state.imgURL ||'http://valleyosteopathy.com.au/wp-content/uploads/2013/11/facebook-default-no-profile-pic1-e1478228271928.jpg'} alt="" width="200px" height="200px"/>
          <RaisedButton
            primary
            label="Change Profile Image"
            onClick={this.onClick.bind(this)}
            disabled={loading}
          />
          <input type="file" id="input" onChange={this.onUpload.bind(this)}/><br />
          <TextField
            hintText="First Name"
            floatingLabelText="Enter First Name"
            value={firstName}
            onChange={(event, value) => this.props.profileFormInputChange({ prop: 'firstName', value })}
            disabled={loading}
          /><br />
          <TextField
            hintText="Last Name"
            floatingLabelText="Enter Last Name"
            value={lastName}
            onChange={(event, value) => this.props.profileFormInputChange({ prop: 'lastName', value })}
            disabled={loading}
          /><br />
          <TextField
            hintText="Location"
            floatingLabelText="Enter Location"
            value={this.props.profile.location || ''}
            onChange={(event, value) => this.props.profileFormInputChange({ prop: 'location', value })}
            disabled={loading}
          /><br />
          <TextField
            multiLine={true}
            rows={2}
            hintText="About"
            floatingLabelText="Tell Us About Yourself"
            onChange={(event, value) => this.props.profileFormInputChange({ prop: 'about', value })}
            disabled={loading}
          /><br />
          {this.renderSpinner()}
          <RaisedButton label="Edit Profile" onClick={this.onEditClick.bind(this)} disabled={loading} />
        </div>

      </div>
    )
  }

  renderProfileCard() {
    const { firstName, lastName } = this.props.profile;
    return (
      <Card id="profile-card">
        <img src={this.props.profile.photo || 'http://valleyosteopathy.com.au/wp-content/uploads/2013/11/facebook-default-no-profile-pic1-e1478228271928.jpg'} alt="" width="100%" height="350px"/>
        <CardTitle
          title={`${firstName} ${lastName}`}
          subtitle={this.props.profile.location || ''}
        />
        <CardText>
          {this.props.profile.about || ''}
        </CardText>
      </Card>
    );
  }

  render() {
    if (!this.props.profile) {
      return <div></div>
    }

    return(
      <div id="profile-page-content">
        <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
          <div>{this.renderProfileCard()}</div>
          <div>{this.renderEditForm()}</div>
        </SwipeableViews>
        <Tabs id="tabs" onChange={this.handleChange} value={this.state.slideIndex}>
          <Tab label="Profile" value={0} />
          <Tab label="Edit Profile" value={1} />
        </Tabs>
      </div>
    );
  }
};

function mapStateToProps({ profile }) {
  console.log(profile);
  return { profile };
}
export default connect(mapStateToProps, actions)(Profile);
