import React, { Component } from 'react';
import { connect } from 'react-redux';
class Home extends Component {
  render() {
    console.log('render');
    return (
      <div>
        Current uid: {this.props.user}
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  const { user } = auth;
  console.log(user);
  return { user };
}
export default connect(mapStateToProps)(Home);
