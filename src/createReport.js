import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';

const GEOCODER = require('geocoder');
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
          incidentDetails: "ADD FORM ELEMENT TO ALLOW USER TO EDIT ME",
          userId: this.props.userId
    }
  }

  // The following handle methods collect the users input for each property
  handleChangeIncidentType = (e)=>{
    this.setState({incidentType: e.currentTarget.value})
  }
  handleChangeIncidentLocationDescription = (e)=>{
    this.setState({incidentLocationDescription: e.currentTarget.value})
  }
  handleChangeAddressToBeGeocoded = (e)=>{
    this.setState({addressToBeGeocoded: e.currentTarget.value})
  }

  // Gets the coordinates for the incident creation
  getCoordinates = ()=>{
    // The geocode method takes a vague address and returns information about that address ex. latitude and longitude
    GEOCODER.geocode(this.state.addressToBeGeocoded, (err,res)=>{
      // Saving the latitude and longitude in state and checking for address input errors
      // if (res.error_message) {
      //   console.log("create UI notice to the user that the address doesnt work")
      // } else if (res.status === "OK") {
      //   this.setState({addressLongitude: res.results[0].geometry.location.lng, addressLatitude: res.results[0].geometry.location.lat})
      //   this.createFormData();
      // } else if (res.status === "ZERO_RESULTS"){
      //   console.log("create UI notice to the user that the address doesnt work")
      // } else {
      //   console.log('unhandled error in get coordinates createReport component',res)
      // }
      console.log('error',err)
      console.log('res',res)
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

  // Calls API to create a new database entry
  makeNewDatabaseEntry = (FORM_DATA)=>{
      REQUEST
        .post('https://afternoon-anchorage-72517.herokuapp.com/incident/create')
        .send(FORM_DATA)
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