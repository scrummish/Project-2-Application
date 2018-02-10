import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SignInScreen from './SignInScreen'
// import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
     signedin: false
    }
  }
  loginSuccess = (bool)=>{
    this.setState({signedin: bool})
  }
  render() {
    return (
      <div className="App">
        {this.state.signedin ? null : <SignInScreen loginSuccess={this.loginSuccess}/>}
      </div>
    );
  }
}

export default App;