import React, { Component } from 'react';
import APIKEY from './config.js'
import GoogleMapReact from 'google-map-react'
import './css/IncidentMap.css'
import Menu from './DrawerMenu'

const request = require('superagent');
const geocoder = require('geocoder');
const defaultMapCenter = {lat: 41.882059,lng: -87.627815};
const defaultZoom = 11;

	      // <form>
	      // <span>
	      // <label>Enter an address:</label>
	      // <input type="text" value={this.state.addressToBeGeocoded} onChange={this.handleChange}/> 
	      // <button onClick={this.handleSubmit}>Submit</button>
	      // </span>
	      // </form>

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
		 console.log('this is this.state.addressToBeGeocoded',this.state.addressToBeGeocoded)
		geocoder.geocode(this.state.addressToBeGeocoded, (error, response )=>{
  		        console.log("This is the response for the geocoder", response)
				// console.log("this is the error for the geocoder", error)
				this.getLatitude(response.results[0].geometry.location.lat)
		 	    this.getLongitude(response.results[0].geometry.location.lng)
				 // console.log('fud', response.results[0].geometry.location.lat)
		   //       console.log('dsr', response.results[0].geometry.location.lng)
			});
	}
	renderMarkers = (map, maps) => {
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
		console.log(this.state.latitudes)
		console.log(this.state.longitudes)


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
	      <Menu/>

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
