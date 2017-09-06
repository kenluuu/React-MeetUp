import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { CircularProgress } from 'material-ui';
class Home extends Component {
  render() {
    return (
      <div style={{ position: 'relative', top: '100px' }}>
        Current user: {this.props.user.firstName} {this.props.user.lastName}
      </div>
    )
  }
}

function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps)(Home);
