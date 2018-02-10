import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SignInScreen from './SignInScreen'
// import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
     toggleUser: true
    }
  }
  render() {
    return (
      <div className="App">
        <SignInScreen/>
      </div>
    );
  }
}

export default App;