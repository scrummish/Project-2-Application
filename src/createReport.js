import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';

class Modal extends Component {
render() {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div className="modal-container"> 
        <div id ="cloud1"></div>
        <div id ="cloud2"></div>
        <div id ="cloud">
          <div className="cloud-field">
             <TextField fullWidth={true} hintText="Type of incident" floatingLabelText="Incident *"/>
          </div>
          <div className="cloud-field">
             <TextField fullWidth={true} hintText="Location Description" floatingLabelText="Description"/>
          </div>
          <div className="cloud-field">
             <TextField fullWidth={true} hintText="Enter the incident address" floatingLabelText="Address *"/>
          </div>
          <div className="modal-button">
            <RaisedButton label="SUBMIT" fullWidth={true} primary={true}/>
          </div>
          <div className="cloud-field">
             <TextField fullWidth={true} hintText="On Going" floatingLabelText="On Going Investigation"/>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
    );
  }
}
export default Modal;