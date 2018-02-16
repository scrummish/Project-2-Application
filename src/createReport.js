import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';

import APIKEY from './config.js'


const request = require('superagent');

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
  
  // Converts address stored in state to latitude and longitude
  getURL = (address) => {
    const rootURL = "https://maps.googleapis.com/maps/api/geocode/json?address="
    const apiKeyURLending = "&key=" + APIKEY;
    const completeURL = rootURL + address + apiKeyURLending
    return completeURL
  }
  addCoordinate = (lat, long) => {
    
    console.log("addCoordinate called with lat " + lat + " and long " + long);

    this.setState({
      addressLatitude: lat,
      addressLongitude: long
    })
    this.createFormData()
  }
  getCoordinates = ()=>{
    request
      .get(this.getURL(this.state.addressToBeGeocoded))
      .end((error, response)=>{
        const responseJSON = JSON.parse(response.text)
        console.log('here is my JSON response.results',responseJSON.results)
        console.log('THIS IS MY ERROR', error)
        if(responseJSON.results.length===0){
          console.log('fake address error')
        } else {
        const latitude = responseJSON.results[0].geometry.location.lat;
        const longitude = responseJSON.results[0].geometry.location.lng;
        // this.getLatitude(latitude);
        // this.getLongitude(longitude);
        this.addCoordinate(latitude, longitude)
      }

      })
  }

  // After the geocode method retrieves the lat and long, we create an object with the data needed for the database entry
  createFormData = ()=>{
    let state = this.state
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
      request.post('https://afternoon-anchorage-72517.herokuapp.com/incident/create')
      .send(formData)
      .end((err,createdIncident)=>{
          // if(err){
          //   console.log('CREATEREPORT err------',err);
          //   this.props.handleClose();
          // } 
          // console.log(createdIncident.text)
          console.log(createdIncident.text)
          
          // this.props.addCoordinate(parsedResponse.latitude, parsedResponse.longitude)
      })

  }


  close = (e)=>{
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