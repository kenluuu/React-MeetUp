import React, { Component } from 'react';
import { AppBar, FlatButton, Badge, IconMenu, MenuItem, IconButton, Drawer } from 'material-ui';
import Person from 'material-ui/svg-icons/social/person';
import Notifiactions from 'material-ui/svg-icons/social/notifications'
import Menu from 'material-ui/svg-icons/navigation/menu';
import { connect } from 'react-redux';
import * as actions from '../actions'
import { Link } from 'react-router-dom';
import _ from 'lodash';
import '../styles/navbar.css'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { newNotifications: 0, showMenu: false, open: false };
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    if (window.innerWidth <= 760) {
      this.setState({ showMenu: true });
    } else if (window.innerWidth > 760) {
      this.setState({ showMenu: false });
    }
  }
  
  componentWillReceiveProps(newProps) {
    const noteLength = localStorage.getItem('noteLength');
    if (noteLength >= 0 && newProps.notifications.length > 0) {
      const numberOfNewNotifications = newProps.notifications.length - localStorage.getItem('noteLength');
      if (numberOfNewNotifications > 0) {
        this.setState({ newNotifications: numberOfNewNotifications })
      }
    }
  }

  onSignOut() {
    localStorage.removeItem('uid');
    this.setState({ newNotifications: 0 });
    this.setState({ open: false });
    this.props.signOut();
  }

  renderNotificationsList() {
    return (
      <Badge secondary badgeContent={this.state.newNotifications} badgeStyle={this.renderBadgeStyle()}>
        <IconMenu
          iconButtonElement={<FlatButton icon={<Notifiactions />} style={{ color: 'white', minWidth: '33px' }}/>}
          anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
          onClick={this.checkedNotifications.bind(this)}
          menuStyle={{ maxHeight: '500px' }}
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
        <MenuItem  primaryText={note} style={{ width: '400px' }} key={uid}
          onClick={() => {
            this.props.history.push(`/meetup/${eventUID}/user=${eventCreatorID}`);
            this.props.fetchMeetup(eventUID);
            this.props.fetchCreator(eventCreatorID);
            this.props.fetchAttendingUsers(eventUID);
          }}
        />
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
        <div id="button-layout">
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

  renderDrawer() {
    const uid = localStorage.getItem('uid');
    if (uid) {
      return (
        <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})} width={200}>
          <Link to="/"><MenuItem onClick={() => this.setState({ open: false })}>Home</MenuItem></Link>
          <Link to={`/profile/${uid}`}><MenuItem onClick={() => this.setState({ open: false })}>Profile</MenuItem></Link>
          <Link to="/create"><MenuItem onClick={() => this.setState({ open: false })}>Create</MenuItem></Link>
          <Link to="/auth"><MenuItem onClick={() => this.onSignOut()}>Sign Out</MenuItem></Link>
        </Drawer>
      );
    }
    return (
      <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})} width={200}>
        <Link to="/"><MenuItem onClick={() => this.setState({ open: false })}>Home</MenuItem></Link>
        <Link to="/auth"><MenuItem onClick={() => this.setState({ open: false })}>Sign In</MenuItem></Link>
      </Drawer>
    )
  }

  render() {
    return(
      <div>
        <AppBar style={{ position: 'fixed'}}
          iconElementLeft={<IconButton><Menu /></IconButton>}
          iconStyleLeft={{ display: `${this.state.showMenu ? 'block' : 'none'}` }}
          onLeftIconButtonTouchTap={() => this.setState({ open: !this.state.open })}
        >
          <div id="button-layout">
            {<Link id="" to="/"><FlatButton className="btn" label="Home" style={{ color: 'white'}}/></Link>}
            {this.renderAuth()}
          </div>
          {this.renderDrawer()}
        </AppBar>
      </div>
    );
  }
};

function mapStateToProps({ user, notifications }) {
  notifications = _.map(notifications, (value, uid) => {
    return { ...value, uid };
  });
  return { user, notifications };
}
export default connect(mapStateToProps, actions)(Navbar);
