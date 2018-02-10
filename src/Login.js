import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './login.css';

class Login extends Component {
  constructor(){
    super();
    
    this.state={
      email:'',
      password:'',
      toggleError: false
    }
  }
  handleLogin = ()=>{
    if (this.state.email === '' || this.state.password === '') {
      this.setState({toggleError: true})
    } else {
      const LOGIN = {
        email: this.state.email,
        password: this.state.password
      }
      this.props.login(LOGIN);
    }    
  }
render() {
  return (
      <div className="log-in-section"> 
     
          <div className="login-form-email">
            <TextField fullWidth={true} hintText="Enter your Email" floatingLabelText="Email*" onChange = {(e,newValue) => this.setState({email:newValue})}/>
          </div>
          <div className="login-form-password">
            <TextField fullWidth={true} type="password" hintText="Enter your Password" floatingLabelText="Password*" onChange = {(e,newValue) => this.setState({password:newValue})}/>
          </div>
          <div className="login-button">
            <RaisedButton label="Login" primary={true}  onClick={this.handleLogin}/>
          </div>
       
      </div>
    );
  }
}
export default Login;