import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Register extends Component {
  constructor(){
    super();
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:''
    }
  }
  render() {
    return (
      <div>
          <div>
          <AppBar title="Register"/>
           <TextField hintText="Enter your First Name" floatingLabelText="First Name" onChange={(e,newValue) => this.setState({first_name:newValue})}/>
           <br/>
           <TextField hintText="Enter your Last Name" floatingLabelText="Last Name" onChange={(e,newValue) => this.setState({last_name:newValue})}/>
           <br/>
           <TextField hintText="Enter your Email" type="email" floatingLabelText="Email" onChange={(e,newValue) => this.setState({email:newValue})}/>
           <br/>
           <TextField type = "password" hintText="Enter your Password" floatingLabelText="Password" onChange={(e,newValue) => this.setState({password:newValue})}/>
           <br/>
           <RaisedButton label="Submit" primary={true} onClick={(e) => this.handleClick(e)}/>
          </div>
      </div>
    );
  }
}

export default Register;