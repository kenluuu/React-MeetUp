import React, { Component } from 'react';
import { Card, CardTitle, CardText, Tabs, Tab, TextField, RaisedButton, CircularProgress } from 'material-ui';
import SwipeableViews from 'react-swipeable-views';
import { connect } from 'react-redux';
import * as actions from '../..//actions';
import ProfileCard from './components/ProfileCard';
import Form from '../../components/common/Form';
import ProfileEditForm from './components/ProfileEditForm';
import '../../styles/profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { slideIndex: 0, imgURL: '', open: false };
  }

  // onClick() {
  //   const input = document.getElementById('input');
  //   input.click();
  // }
  //
  // renderImg() {
  //   if (this.state.imgURL) {
  //     return <img id="img" src={this.state.imgURL} alt="" />
  //   }
  // }
  // onUpload(event) {
  //   const file = event.target.files;
  //   const fileReader = new FileReader();
  //   fileReader.readAsDataURL(file[0]);
  //   fileReader.onload = () => {
  //     this.props.profileFormInputChange({ prop: 'img', value: file[0] })
  //     this.setState({ imgURL: fileReader.result });
  //   };
  // }
  handleChange = value => {
    this.setState({ slideIndex: value });
  }
  componentDidMount() {
    const profileUserId = this.props.match.params.id;
    this.props.fetchUserProfileInfo(profileUserId);
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
    const { firstName, lastName, loading, location, photo, about } = this.props.profile;
    const { profileFormInputChange } = this.props;
    const { imgURL } = this.state;

    return (
      <Form loading={loading}>
        <ProfileEditForm
          firstName={firstName} lastName={lastName} loading={loading} location={location}
          photo={photo} about={about} profileFormInputChange={profileFormInputChange}
          onEditClick={this.onEditClick.bind(this)}
        />
      </Form>
    );
  }
  renderEditTabs() {
    const profileUserId = this.props.match.params.id;
    const userId = localStorage.getItem('uid');
    if (userId === profileUserId) {
      return (
        <Tabs id="tabs" onChange={this.handleChange} value={this.state.slideIndex}>
          <Tab label="Profile" value={0} />
          <Tab label="Edit Profile" value={1} />
        </Tabs>
      );
    }
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  renderProfileCard() {
    const { firstName, lastName, photo, location, about } = this.props.profile;
    return (
      <ProfileCard
        firstName={firstName}
        lastName={lastName}
        photo={photo}
        location={location}
        about={about}
      />
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
        {this.renderEditTabs()}
      </div>
    );
  }
};

function mapStateToProps({ profile }) {

  return { profile };
}
export default connect(mapStateToProps, actions)(Profile);
