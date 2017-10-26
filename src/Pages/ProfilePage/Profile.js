import React, { Component } from 'react';
import {  Tabs, Tab } from 'material-ui';
import SwipeableViews from 'react-swipeable-views';
import { connect } from 'react-redux';
import * as actions from '../..//actions';
import ProfileCard from './components/ProfileCard';
import Form from '../../components/common/Form';
import ProfileEditForm from './components/ProfileEditForm';
import PageShell from '../../components/common/PageShell';
import '../../styles/profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { slideIndex: 0, open: false };
  }

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

  renderEditForm() {
    const { firstName, lastName, loading, location, photo, about } = this.props.profile;
    const { profileFormInputChange } = this.props;

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
    const { userId } = this.props.profile;
    const uid = localStorage.getItem('uid');
    if (uid === userId) {
      return (
        <Tabs id="tabs" onChange={this.handleChange} value={this.state.slideIndex}>
          <Tab label="Profile" value={0} />
          <Tab label="Edit Profile" value={1} />
        </Tabs>
      );
    }
  }

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
  componentDidUpdate() {
    const nextUserId = this.props.match.params.id;
    const currentUserId = this.props.profile.userId;
    if (nextUserId !== currentUserId) {
      this.props.fetchUserProfileInfo(nextUserId);
    }
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
export default connect(mapStateToProps, actions)(PageShell(Profile));
