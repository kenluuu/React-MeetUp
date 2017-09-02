import React, { Component } from 'react';
import { AppBar, FlatButton } from 'material-ui';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'

class Navbar extends Component {
  render() {
    return(
      <div>
        <AppBar>
          <div id="button-layout">
            <Link to="/auth"><FlatButton className="btn" label="Sign In" style={{ color: 'white'}}/></Link>
          </div>
        </AppBar>
      </div>
    );
  }
};


export default Navbar;
