import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SignInScreen from './SignInScreen'
import './css/WelcomeScreen.css';

class WelcomeScreen extends Component {
  constructor(){
    super();

    this.state = {
     
    }
  }
  render() {
    return (
      <div>
        <h1>Welcome to Snitchr!</h1>
        <h3>Catchy tag line or something</h3>
      </div>
    );
  }
}

export default WelcomeScreen;