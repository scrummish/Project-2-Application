import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Register extends Component {
  constructor(){
    super();
    this.state={
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      toggleError: false
    }
  }
  createUser = ()=>{
    if (this.state.firstname === '' || this.state.email === '' || this.state.password === '') {
      this.setState({toggleError: true})
    } else {
      const REGISTRATION = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      }
      this.props.register(REGISTRATION);
    }
  }
  render() {
    return (
      <div>
          <div>
          <AppBar title="Register"/>
           <TextField hintText="Enter your First Name" floatingLabelText="First Name *" onChange={(e,newValue) => this.setState({firstname:newValue})}/>
           <br/>
           <TextField hintText="Enter your Last Name" floatingLabelText="Last Name" onChange={(e,newValue) => this.setState({lastname:newValue})}/>
           <br/>
           <TextField hintText="Enter your Email" type="email" floatingLabelText="Email *" onChange={(e,newValue) => this.setState({email:newValue})}/>
           <br/>
           <TextField type = "password" hintText="Enter your Password" floatingLabelText="Password *" onChange={(e,newValue) => this.setState({password:newValue})}/>
           <br/>
           <RaisedButton label="Submit" primary={true} onClick={this.createUser}/>
          </div>
      </div>
    );
  }
}

export default Register;