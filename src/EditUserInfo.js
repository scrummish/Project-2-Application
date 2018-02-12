import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
const styles = {
  register: {
    "font-size": "1.1em",
    color: 'rgb(0, 188, 212)',
    'padding-left': '0',
    'margin-left': '5%',
    'font-weight': '600',
  }
};


class EditUserInfo extends Component {
  constructor(){
    super();
    this.state={
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      phonenumber: ''
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
      <div className="log-in-section">
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
              <TextField fullWidth={true} hintText="Enter your Email" type="email" floatingLabelText="Email *" onChange={(e,newValue) => this.setState({email:newValue})}/>
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

export default EditUserInfo;