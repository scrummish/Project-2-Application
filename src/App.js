import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SignInScreen from './SignInScreen'

import IncidentMap from './IncidentMap'

// import './App.css';

import WelcomeScreen from './WelcomeScreen.js';
<<<<<<< HEAD

import './css/App.css';

=======
import './css/App.css';
>>>>>>> 62cc045a284aee7464784e9f6332d68eaceeeea0

class App extends Component {
  constructor(){
    super();

    this.state = {
     signedin: false,

     toggleFormError: false

    }
  }
  loginSuccess = ()=>{
    this.setState({signedin: true})
  }
  reRenderForm = ()=>{
    console.log(this.state.toggleFormError, "un rendered app.js")
    this.setState({toggleFormError: true})
    console.log(this.state.toggleFormError, "re rendered app.js")
  }
  render() {

      
    
    return (
      // {this.state.signedin ? <WelcomeScreen/> : <SignInScreen loginSuccess={this.loginSuccess} reRenderForm={this.reRenderForm} toggleFormError={this.state.toggleFormError}/>}
      <div className="App">

        
        <IncidentMap />
        
        

        

      </div>
    );
  }
}

export default App;