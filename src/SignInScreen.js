import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Login from './Login'
import Register from './Register'
import './SignInScreen.css';

const REQUEST = require('superagent');

class SignInScreen extends Component {
  constructor(){
    super();
    
    this.state={

    }
  }
  register = (formData)=>{
      REQUEST.post('http://localhost:9292/user/')
      .send(formData)
      .end((err,createdUser)=>{
          const parsedUser = JSON.parse(createdUser.text);
          console.log(parsedUser)
      })
  }
  login = (formData)=>{
      REQUEST.post('http://localhost:9292/user/')
      .send(formData)
      .end((err,createdUser)=>{
          const parsedUser = JSON.parse(createdUser.text);
          console.log(parsedUser, 'loggedin')
      })
  }
render() {
  return (
      <div class="sign-in-flex-container">
        <section id="sign-in-flex-child1" class="sign-in-flex-child">side 1</section>
        <section id="sign-in-flex-child2" class="sign-in-flex-child">
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Login login={this.login}/>
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Register register={this.register}/>
          </MuiThemeProvider>  
        </section>
      </div>
    );
  }
}
export default SignInScreen;