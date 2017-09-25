import React, { Component } from 'react';
import { AppBar, FlatButton, IconButton, Badge, IconMenu, MenuItem } from 'material-ui';
import Person from 'material-ui/svg-icons/social/person';
import Notifiactions from 'material-ui/svg-icons/social/notifications'
import { connect } from 'react-redux';
import * as actions from '../actions'
import { Link } from 'react-router-dom';
import _ from 'lodash';
import '../styles/navbar.css'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { newNotifications: 0 }
  }

  componentWillReceiveProps(newProps) {

    const noteLength = localStorage.getItem('noteLength');
    if (noteLength > 0 && newProps.notifications.length > 0) {
      const numberOfNewNotifications = newProps.notifications.length - localStorage.getItem('noteLength');
      if (numberOfNewNotifications > 0) {
        this.setState({ newNotifications: numberOfNewNotifications })
      }
    }

  }
  onSignOut() {
    localStorage.removeItem('uid');
    localStorage.removeItem('noteLength');
    this.props.signOut();
  }

  renderNotificationsList() {
    return (
      <Badge secondary badgeContent={this.state.newNotifications} badgeStyle={this.renderBadgeStyle()}>
        <IconMenu
          iconButtonElement={<FlatButton icon={<Notifiactions />} style={{ color: 'white', minWidth: '33px' }}/>}
          anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
          onClick={this.checkedNotifications.bind(this)}
        >
          {this.renderNotificationItem()}
        </IconMenu>
      </Badge>
    )
  }



  checkedNotifications() {
    this.props.editNotificationLength(localStorage.getItem('uid'), this.props.notifications.length);
    this.setState({ newNotifications: 0 });
  }

  renderNotificationItem() {
    return this.props.notifications.map(notification => {
      const { eventUID, uid, eventCreatorID, note } = notification;
      return (
        <Link to={`/meetup/${eventUID}?user=${eventCreatorID}`} key={uid}>
          <MenuItem  primaryText={note} style={{ width: '400px' }}/>
        </Link>
      );
    });
  }

  renderBadgeStyle() {
    if (this.state.newNotifications > 0) {
      return { top: 12, right: 12 };
    }
    return { display: 'none'};
  }

  renderAuth() {
    const userId = localStorage.getItem('uid');
    if (userId) {
      return (
        <div>
          <Link to={`/profile/${userId}`}>
            <FlatButton id="profile-btn" icon={<Person />} label="Profile" style={{ color: 'white' }} onClick={() => this.props.fetchUserProfileInfo(userId)}/>
          </Link>
          <Link to="/create">
            <FlatButton label="Create Meetup" style={{ color: 'white'}}/>
          </Link>
          {this.renderNotificationsList()}
          <Link to="/auth">
            <FlatButton onClick={this.onSignOut.bind(this)} label="Sign Out" style={{ color: 'white'}}/>
          </Link>
        </div>
      );
    }
    else if(_.isEmpty(this.props.user)) {
      return (
        <Link to="/auth"><FlatButton className="btn" label="Sign In" style={{ color: 'white'}}/></Link>
      );
    }
  }

  render() {
    return(
      <div>
        <AppBar style={{ position: 'fixed'}}>
          <div id="button-layout">
            <Link id="home" to="/"><FlatButton className="btn" label="Home" style={{ color: 'white'}}/></Link>
            {this.renderAuth()}
          </div>
        </AppBar>
      </div>
    );
  }
};

function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps, actions)(Navbar);
