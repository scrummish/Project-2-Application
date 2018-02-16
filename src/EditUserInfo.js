import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const request = require('superagent')
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
    }
  }
  handleChangeFirstName = (e) =>{
    // Saving the users input in state
    this.setState({firstname: e.currentTarget.value})
  }
  handleChangeLastName = (e) =>{
    // Saving the users input in state
    this.setState({lastname: e.currentTarget.value})
  }
  handleChangeEmail = (e) =>{
    // Saving the users input in state
    this.setState({email: e.currentTarget.value})
  }
  // createUser = ()=>{
  //   if (this.state.firstname === '' || this.state.email === '' || this.state.password === '') {
  //     this.setState({toggleError: true})
  //   } else {
  //     const REGISTRATION = {
  //       firstname: this.state.firstname,
  //       lastname: this.state.lastname,
  //       email: this.state.email,
  //       password: this.state.password
  //     }
  //     this.props.register(REGISTRATION);
  //   }
  // }
  getURL = () =>{
    const url = 'https://afternoon-anchorage-72517.herokuapp.com/user/' + this.props.userId
    return url
  }
  setStateWithUserData = (firstName, lastName, email) => {
    this.setState({
      firstname: firstName,
      lastname: lastName,
      email: email
    })
    console.log('this is firstname', this.state.firstname)
    console.log('this is lastname', this.state.lastname)
    console.log('this is email', this.state.email)
  }
  componentDidMount(){
    console.log('this is my USER ID', this.props.userId)
    console.log('this is this.getUrl return', this.getURL())
    request
      .get(this.getURL())
      .end((err,ToBeEditedUser)=>{
   //       console.log('the error in user didmount', err)
   //       console.log('ToBeEditedUser data is', ToBeEditedUser.text)
          const ToBeEditedUserJSON = JSON.parse(ToBeEditedUser.text);
   //       console.log('toBeEditedUserJSON data is', ToBeEditedUserJSON)
          this.setStateWithUserData(ToBeEditedUserJSON.users.firstname, ToBeEditedUserJSON.users.lastname, ToBeEditedUserJSON.users.email)
      })
  }
  getURLforPut = () =>{
    const url = 'https://afternoon-anchorage-72517.herokuapp.com/user/edit/' + this.props.userId
    return url
  }
  getStateUserData = () => {
    let state = this.state
    const editedUserData = {
      firstname: state.firstName,
      lastname: state.lastName,
      email: state.email,
      userId: this.props.userId

    }
    return editedUserData
  }
  postUser = (formData) => {
    console.log('this.getURLforput', this.getURLforPut())
    console.log('this is form data', formData)
    request
      .put(this.getURLforPut())
      .send(formData)
      .end((err,editedUser)=>{
        console.log('this is err', err)
          const editedUserJSON = JSON.parse(editedUser.text);
          console.log('editedUserJSON', editedUserJSON)
          this.props.handleClose();
    
      })
  }

  editUser = () => {
    let state = this.state
    const formData = {
      firstname: state.firstname,
      lastname: state.lastname,
      email: state.email,
      userId: state.userId
    }
    this.postUser(formData);
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div className="modal-container" onClick={this.closeModal}> 
      <div id ="cloud1"></div>
        <div id ="cloud2"></div>
        <div id ="cloud">
          <div className="cloud-field">
             <TextField value={this.state.firstname} onChange={this.handleChangeFirstName} fullWidth={true} hintText="First Name" floatingLabelText='first name'/>
          </div>
          <div className="cloud-field">
             <TextField value={this.state.lastname} onChange={this.handleChangeLastName} fullWidth={true} hintText="Last Name" floatingLabelText='last name'/>
          </div>
          <div className="cloud-field">
             <TextField value={this.state.email} onChange={this.handleChangeEmail} fullWidth={true} hintText="Email" floatingLabelText='email'/>
          </div>
          <div className="modal-button">
            <RaisedButton onClick={this.editUser} label="SUBMIT" fullWidth={true} primary={true}/>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default EditUserInfo;