import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import './css/Login.css';

const REQUEST = require('superagent');

const styles = {
  login: {
    fontSize: "1.1em",
    color: 'rgb(0, 188, 212)',
    paddingLeft: '0',
    marginLeft: '5%',
    fontWeight: '600',
  }
};

class Login extends Component {
  constructor(){
    super();
    
    this.state={
      email:'',
      password:'',
      toggleLoginError: true
    }
  }
  handleLogin = (e)=>{
    const loginData = {
      email: this.state.email,
      password: this.state.password
    }
    this.login(loginData);
  }
  handleKeyPress = (e)=>{
    if(e.charCode === 13){
        this.handleLogin();
    }
  }
  login = (formData)=>{
      REQUEST.post('http://localhost:9292/user/login')
      .send(formData)
      .end((err,createdUser)=>{
        const parsedUser = JSON.parse(createdUser.text);
        const registration_success_or_fail = parsedUser[2][1];
      
        if (registration_success_or_fail === true) {
          console.log(parsedUser[4][1])
          this.props.loginSuccess(parsedUser[4][1]);
        } else {
          this.setState({toggleLoginError: false})
        }
      })
  }
render() {
  return (
      <div className="log-in-section" onKeyPress={this.handleKeyPress}> 
        <Subheader style={styles.login}>Existing Users</Subheader>
          <div className="login-form-email">
           {this.state.toggleLoginError ? <TextField fullWidth={true} hintText="Enter your Email" floatingLabelText="Email*" onChange = {(e,newValue) => this.setState({email:newValue})}/> : <TextField fullWidth={true} hintText="Enter your Email" errorText="Invalid email or password" floatingLabelText="Email*" onChange = {(e,newValue) => this.setState({email:newValue})}/>}
          </div>
          <div className="login-form-password">
            {this.state.toggleLoginError ? <TextField fullWidth={true} type="password" hintText="Enter your Password" floatingLabelText="Password*" onChange = {(e,newValue) => this.setState({password:newValue})}/> : <TextField fullWidth={true} type="password" hintText="Enter your Password" errorText="Invalid email or password" floatingLabelText="Password*" onChange = {(e,newValue) => this.setState({password:newValue})}/>}
          </div>
          <div className="login-button">
            <RaisedButton label="Login" primary={true}  onClick={this.handleLogin}/>
          </div>
          <br/>
      </div>
    );
  }
}
export default Login;