import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';

class Login extends Component {
  constructor(){
    super();
    
    this.state={
      email:'',
      password:''
    }
  }
render() {
  return (
      <div>
        <Subheader>Login Form</Subheader>
        <div>
        <TextField hintText="Enter your Email" floatingLabelText="Email" onChange = {(e,newValue) => this.setState({email:newValue})}/>
        <br/>
        <TextField type="password" hintText="Enter your Password" floatingLabelText="Password" onChange = {(e,newValue) => this.setState({password:newValue})}/>
        <br/>
        <RaisedButton label="Login" primary={true}  onClick={(event) => this.handleClick(event)}/>
        </div>
      </div>
    );
  }
}
export default Login;