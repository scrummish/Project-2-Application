import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Login from './Login'
import Register from './Register'
import snitchrlogo from './snitchrlogo.png';
import './css/SignInScreen.css';



class SignInScreen extends Component {
  constructor(props){
    super(props);
    
    this.state={
      
    }
  }
render() {
  return (
      <div className="sign-in-flex-container">
        <section id="sign-in-flex-child1" className="sign-in-flex-child">
          <img src={snitchrlogo}/>
          <p id="subtitle">be safe, be aware, be informed</p>
        </section>
        <section id="sign-in-flex-child2" className="sign-in-flex-child">
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Login login={this.login} loginSuccess={this.props.loginSuccess}/>
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Register register={this.register} toggleFormError={this.props.toggleFormError} loginSuccess={this.props.loginSuccess}/>
          </MuiThemeProvider>  
        </section>
      </div>
    );
  }
}
export default SignInScreen;