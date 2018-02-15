import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
const REQUEST = require('superagent');
const styles = {
  register: {
    fontSize: "1.1em",
    color: 'rgb(0, 188, 212)',
    paddingLeft: '0',
    marginLeft: '5%',
    fontWeight: '600',
  }
};

class Register extends Component {
  constructor(props){
    super(props);
    
    this.state={
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      toggleError: false,
      toggleEmailError: false
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
      this.register(REGISTRATION);
    }
  }
  register = (formData)=>{
      REQUEST.post('http://localhost:9292/user/')
      .send(formData)
      .end((err,createdUser)=>{
          const parsedUser = JSON.parse(createdUser.text);
          if (parsedUser === "false") {
            this.setState({toggleEmailError: true})
          } else {
            this.props.loginSuccess(parsedUser[4][1]); 
          }
      })
  }
  handleKeyPress = (e)=>{
    if(e.charCode === 13){
      this.createUser();
    }
  }
  render() {
    return (
      <div className="log-in-section" onKeyPress={this.handleKeyPress}>
            <br/>
            <Subheader style={styles.register}>New User?</Subheader>
            <div className="register-field">
              <TextField fullWidth={true} hintText="Enter your First Name" floatingLabelText="First Name *" onChange={(e,newValue) => this.setState({firstname:newValue})}/>
            </div>
            <br/>
            <div className="register-field">
              <TextField fullWidth={true} hintText="Enter your Last Name" floatingLabelText="Last Name" onChange={(e,newValue) => this.setState({lastname:newValue})}/>
            </div>
            <br/>
            <div className="register-field">
              { this.state.toggleEmailError ? <TextField fullWidth={true} hintText="Enter your Email" errorText="Invalid email" type="email" floatingLabelText="Email *" onChange={(e,newValue) => this.setState({email:newValue})}/> : <TextField fullWidth={true} hintText="Enter your Email" type="email" floatingLabelText="Email *" onChange={(e,newValue) => this.setState({email:newValue})}/> }
            </div>
            <br/>
            <div className="register-field">
              <TextField fullWidth={true} type = "password" hintText="Enter your Password" floatingLabelText="Password *" onChange={(e,newValue) => this.setState({password:newValue})}/>
            </div>
            <br/>
            <div className="login-button">
              <RaisedButton label="Register" primary={true} onClick={this.createUser}/>
            </div>
            <br/>
      </div>
    );
  }
}

export default Register;