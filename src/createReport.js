import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';

const geocoder = require('geocoder');
const REQUEST = require('superagent');

class createReport extends Component {
  constructor(props){
    super(props)

    this.state = {
      addressToBeGeocoded: "",
      addressLongitude: "",
      addressLatitude: "",
      incidentType: "",
      incidentLocationDescription: "",
      incidentDetails: "",
      userId: this.props.userId
    }
  }
  handleChangeIncidentType = (e)=>{
    // Saving the users input in state
    this.setState({incidentType: e.currentTarget.value})
  }
  handleChangeIncidentDetails = (e)=>{
    // Saving the users input in state
    this.setState({incidentDetails: e.currentTarget.value})
  }
  handleChangeIncidentLocationDescription = (e)=>{
    // Saving the users input in state
    this.setState({incidentLocationDescription: e.currentTarget.value})
  }
  handleChangeAddressToBeGeocoded = (e)=>{
    // Saving the users input in state
    this.setState({addressToBeGeocoded: e.currentTarget.value})
  }
  getCoordinates = ()=>{
    // The geocode method takes a vague address and returns information about that address ex. latitude and longitude
    geocoder.geocode(this.state.addressToBeGeocoded, (err,res)=>{
      // Saving the latitude and longitude in state
        if (res.status === "ZERO_RESULTS"){
          console.log("ZERO_RESULTS worked")
        } else {
          this.setState({addressLongitude: res.results[0].geometry.location.lng, addressLatitude: res.results[0].geometry.location.lat})
          this.createFormData();
        }
    })
  }
  createFormData = ()=>{
    const state = this.state
    // After the geocode method retrieves the lat and long, we create an object with the data needed for the database entry
    const formData = {
      approximateAddress: state.addressToBeGeocoded,
      addressLongitude: state.addressLongitude,
      addressLatitude: state.addressLatitude,
      incidentType: state.incidentType,
      incidentDetails: state.incidentDetails,
      incidentLocationDescription: state.incidentLocationDescription,
      userId: state.userId
    }
    this.makeNewDatabaseEntry(formData);
  }
  makeNewDatabaseEntry = (formData)=>{
      REQUEST.post('http://localhost:9292/incident/create')
      .send(formData)
      .end((err,createdIncident)=>{
          this.props.handleClose();
      })
  }
  // This lets you close the modal by clicking anywhere around it
  closeModal = (e)=>{
    if (e.target.className === "modal-container") {
      this.props.handleClose();
    }
  }
render() {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div className="modal-container" onClick={this.closeModal}> 
        <div id ="cloud1"></div>
        <div id ="cloud2"></div>
        <div id ="cloud">
          <div className="cloud-field">
             <TextField value={this.state.incidentType} onChange={this.handleChangeIncidentType} fullWidth={true} hintText="Type of crime" floatingLabelText="Incident *"/>
          </div>
          <div className="cloud-field">
             <TextField value={this.state.incidentDetails} onChange={this.handleChangeIncidentDetails} fullWidth={true} hintText="Details of the incident" floatingLabelText="Detailed Snitch *"/>
          </div>
          <div className="cloud-field">
             <TextField value={this.state.incidentLocationDescription} onChange={this.handleChangeIncidentLocationDescription} fullWidth={true} hintText="Location Description" floatingLabelText="Location Details"/>
          </div>
          <div className="cloud-field">
             <TextField value={this.state.addressToBeGeocoded} onChange={this.handleChangeAddressToBeGeocoded} fullWidth={true} hintText="Enter the incidents address" floatingLabelText="Address *"/>
          </div>
          <div className="modal-button">
            <RaisedButton onClick={this.getCoordinates} label="SUBMIT" fullWidth={true} primary={true}/>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
    );
  }
}
export default createReport;