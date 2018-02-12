import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SignInScreen from './SignInScreen'
<<<<<<< HEAD
import IncidentMap from './IncidentMap'

// import './App.css';
=======
import WelcomeScreen from './WelcomeScreen.js';
import './App.css';
>>>>>>> ffaf19bb84e23692f1f3bb9ccca6574f6e988966

class App extends Component {
  constructor(){
    super();

    this.state = {
     signedin: false,
<<<<<<< HEAD
=======
     toggleFormError: false
>>>>>>> ffaf19bb84e23692f1f3bb9ccca6574f6e988966
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
      {this.state.signedin ? <IncidentMap />  : <SignInScreen loginSuccess={this.loginSuccess}/>}
      <div className="App">
<<<<<<< HEAD
        
        
        
        
=======
        {this.state.signedin ? <WelcomeScreen/> : <SignInScreen loginSuccess={this.loginSuccess} reRenderForm={this.reRenderForm} toggleFormError={this.state.toggleFormError}/>}
>>>>>>> ffaf19bb84e23692f1f3bb9ccca6574f6e988966
      </div>
    );
  }
}

export default App;