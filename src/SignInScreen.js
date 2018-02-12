import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Login from './Login'
import Register from './Register'
import './SignInScreen.css';

const REQUEST = require('superagent');

class SignInScreen extends Component {
  constructor(props){
    super(props);
    
    this.state={
      
    }
  }
  login = (formData)=>{
      REQUEST.post('http://localhost:9292/user/login')
      .send(formData)
      .end((err,createdUser)=>{
        const parsedUser = JSON.parse(createdUser.text);
        const registration_success_or_fail = parsedUser[2][1];
        this.props.loginSuccess(registration_success_or_fail);
      })
  }
render() {
  return (
      <div className="sign-in-flex-container">
        <section id="sign-in-flex-child1" className="sign-in-flex-child">
        </section>
        <section id="sign-in-flex-child2" className="sign-in-flex-child">
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Login login={this.login}/>
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