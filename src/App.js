import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SignInScreen from './SignInScreen'
import IncidentMap from './IncidentMap'

// import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
     signedin: false,
    }
  }
  loginSuccess = (bool)=>{
    this.setState({signedin: bool})
  }
  render() {

      
    
    return (
      {this.state.signedin ? <IncidentMap />  : <SignInScreen loginSuccess={this.loginSuccess}/>}
      <div className="App">
        
        
        
        
      </div>
    );
  }
}

export default App;