import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';

const REQUEST = require('superagent');

class Modal extends Component {
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

  // The following handle methods collect the users input for each property
  handleChangeIncidentType = (e)=>{
    this.setState({incidentType: e.currentTarget.value})
  }
  handleChangeIncidentDetails = (e)=>{
    this.setState({incidentDetails: e.currentTarget.value})
  }
  handleChangeIncidentLocationDescription = (e)=>{
    this.setState({incidentLocationDescription: e.currentTarget.value})
  }
  handleChangeAddressToBeGeocoded = (e)=>{
    this.setState({addressToBeGeocoded: e.currentTarget.value})
  }

  // Creates the URL needed to request the coordinates from google
  getURL = (address) => {
    const ROOT_URL = "https://maps.googleapis.com/maps/api/geocode/json?address="
    const API_KEY_URL_ENDING = "&key=AIzaSyDwY1zA1DNB2g1jApsXI7iruNH2ZfAJgfU";
    const COMPLETE_URL = ROOT_URL + address + API_KEY_URL_ENDING
    return COMPLETE_URL
  }

  // Sets the coordinates in state for later use
  addCoordinate = (lat, long) => {
    this.setState({
      addressLatitude: lat,
      addressLongitude: long
    })
    this.createFormData()
  }

  // Requests coordinates from google for a givin address
  getCoordinates = ()=>{
    REQUEST
      .get(this.getURL(this.state.addressToBeGeocoded))
      .end((error, response)=>{
        const responseJSON = JSON.parse(response.text)
        if(responseJSON.results.length===0){
          console.log('fake address error')
        } else {
          const LATITUDE = responseJSON.results[0].geometry.location.lat;
          const LONGITUDE = responseJSON.results[0].geometry.location.lng;
          this.addCoordinate(LATITUDE, LONGITUDE)
        }
      })
  }

  // After the getCoordinates method retrieves the lat and long, we create an object with the data needed for the database entry
  createFormData =()=>{
    const FORM_DATA = {
      approximateAddress: this.state.addressToBeGeocoded,
      addressLongitude: this.state.addressLongitude,
      addressLatitude: this.state.addressLatitude,
      incidentDetails: this.state.incidentDetails,
      incidentType: this.state.incidentType,
      incidentLocationDescription: this.state.incidentLocationDescription,
      userId: this.state.userId
    }
    this.makeNewDatabaseEntry(FORM_DATA);
  }

  // Calls snitchr API to create a new database entry
  makeNewDatabaseEntry = (formData)=>{
    REQUEST
      .post('https://afternoon-anchorage-72517.herokuapp.com/incident/create')
      .send(formData)
      .end((err,createdIncident)=>{
        if (err){
          console.log('error occurred at createReport component', err)
        } else {
          const JSON_RESPONSE = JSON.parse(createdIncident.text)
          this.props.addCoordinate(JSON_RESPONSE.latitude, JSON_RESPONSE.longitude)
          this.props.handleClose()
        }
      })
  }
  // Used to close the createReport Modal when the user clicks anywhere around it
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
             <TextField value={this.state.incidentType} onChange={this.handleChangeIncidentType} fullWidth={true} hintText="Type of incident" floatingLabelText="Incident *"/>
          </div>
          <div className="cloud-field">
             <TextField value={this.state.incidentDetails} onChange={this.handleChangeIncidentDetails} fullWidth={true} hintText="Details of the incident" floatingLabelText="Detailed Snitch *"/>
          </div>
          <div className="cloud-field">
             <TextField value={this.state.incidentLocationDescription} onChange={this.handleChangeIncidentLocationDescription} fullWidth={true} hintText="Location Description" floatingLabelText="Description"/>
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
export default Modal;