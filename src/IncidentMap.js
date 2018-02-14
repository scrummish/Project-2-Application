import React, { Component } from 'react';
import APIKEY from './config.js'
import GoogleMapReact from 'google-map-react'
import './css/IncidentMap.css'
const request = require('superagent');
const geocoder = require('geocoder');
const defaultMapCenter = {lat: 41.882059,lng: -87.627815};
const defaultZoom = 11;
let APIcallURL = ""

class IncidentMap extends Component {
	constructor(props){
		super(props)

		this.state = {
			selectedPlace: "GA",
			submittedAddress: this.props.address,
			latitudes: [],
     		longitudes: [],
     		center: {lat: 41.8781, lng: -87.6298},
      		zoom: 15,
      		addressToBeGeocoded: ""
		}
	}
	getLatitude = (latitude) => {
	    console.log('this is latitude to be added to array', latitude)
	    this.setState({latitudes: [...this.state.latitudes, latitude]})
	     
	}
	getLongitude = (longitude) => {
	    
	    this.setState({longitudes: [...this.state.longitudes, longitude]})
	    // console.log(this.state.longitudes)
	}
	getCoordinates = () => {
		console.log('this is this.state.addressToBeGeocoded',this.state.addressToBeGeocoded);
		const address = this.state.addressToBeGeocoded;
		const addressArray = address.split(' ');

		const rootURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
		const apiKeyURLending = "&key=" + APIKEY;

		for(let i = 0; i<address.length; i++){
			if(i=0){
				rootURL + addressArray[i]
			} else if (i>0 && i != address.length){
				rootURL + '+' + addressArray[i]
			} else if (i===address.length){
				APIcallURL = rootURL + apiKeyURLending;
			}
		}

	}
	renderMarkers = (map, maps, someObject) => {

	  		const marker = new maps.Marker({ 	       
	    	position: {lat: 41.890653, lng: -87.626988},
	    		map,
	      	});
  		
	}
	handleChange = (e) =>{
		
		this.setState({addressToBeGeocoded: e.currentTarget.value})
		//console.log('this is e.currentTarget.value',e.currentTarget.value)

	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.setState({addressToBeGeocoded: e.currentTarget.value});
		//console.log('this is this.state.addressToBeGeocoded', this.state.addressToBeGeocoded)
		this.getCoordinates();
		
	}
	render() {
		this.state.latitudes.map((latitude, i)=>{
			console.log('here are the latitudes',latitude)
			console.log(' here are the longitudes' ,this.state.longitudes[i])
		})
		// console.log(this.state.latitudes)
		// console.log(this.state.longitudes)

		console.log(APIcallURL);



		const style = {
      	width: '100%',
      	height: '100%'
    	  // display: 'flex',
    	  // flex: 1
   		 }

		const MARKER_SIZE = 40;

		const greatPlaceStyle = {
  		position: 'absolute',
  		width: MARKER_SIZE,
  		height: MARKER_SIZE,
  		left: -MARKER_SIZE / 2,
  		top: -MARKER_SIZE / 2
		}

		const AnyReactComponent = ({ text }) => <div>{ text }</div>;
	    return (
	      <div className='google-map'>
	      <form>
	      <span>
	      <label>Enter an address:</label>
	      <input type="text" value={this.state.addressToBeGeocoded} onChange={this.handleChange}/> 
	      <button onClick={this.handleSubmit}>Submit</button>
	      </span>
	      </form>
	        <GoogleMapReact
	       		 defaultCenter={defaultMapCenter}
	       		 defaultZoom={ defaultZoom }
	       		 bootstrapURLKeys={{
	                 key: APIKEY,
	                 language: 'en'
                 }}
                 onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
				 >
	        		<AnyReactComponent

	        			lat={ 41.882059 }
	        			lng={ -87.627815 }
	        			text={ "Default Map Center at State and Madison" }/>

	        </GoogleMapReact>
	      </div>
	    )
	}
}

export default IncidentMap;
