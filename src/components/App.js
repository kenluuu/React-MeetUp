import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './Home';
import SignIn from './SignIn';
import Auth from './Auth';
import Navbar from './Navbar';
import '../styles/app.css';

const App = (props) => {

  return (
    <div>
        <BrowserRouter>
          <MuiThemeProvider>
            <div>
              <Navbar />
              <Route path="/signin" component={SignIn}/>
              <Route path="/auth" component={Auth} />
              <Route exact path="/" component={Home} />
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
    </div>
  );
};

export default App;
