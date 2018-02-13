import React, { Component } from 'react';
import APIKEY from './config.js'
import GoogleMapReact from 'google-map-react'

import nodeGeocode from 'node-geocoder'

import './css/IncidentMap.css'
const request = require('superagent');




const options = {
  provider: 'google',
 
  
  httpAdapter: 'https', 
  apiKey: APIKEY, 
  formatter: null        
};

const defaultMapCenter = {lat: 41.882059,lng: -87.627815};
const defaultZoom = 11;

class IncidentMap extends Component {
	constructor(props){
		super(props)
  
      

    
 
		this.state = {
			selectedPlace: "GA",
			submittedAddress: this.props.address,
			latitudes: [41.89055],
     		longitudes: [-87.626847],
     		center: {lat: 41.8781, lng: -87.6298},
      		zoom: 15,
      		addressToBeGeocoded: ""

		}
	}
	// static defaultProps = {
	//     center: {lat: 41.89055, lng: -87.626847},
	//     zoom: 11
	//   }
	getLatitude = (latitude) => {
	    const state = this.state
	    state.setState({latitudes: [...this.state.latitudes, latitude]})
	}
	getLongitude = (longitude) => {
	    const state = this.state
	    state.setState({longitudes: [...this.state.longitudes, longitude]})
	}
	getCoordinates = () => {

		const geocoder = nodeGeocode(options)

		geocoder.geocode(this.state.address, (error, response)=>{
			console.log("This is the response for the geocoder", response)
			this.getLatitude(response[0].latitude)
			this.getLongitude(response[0].longitude)
		})

	}
	renderMarkers = (map, maps) => {
  		const marker = new maps.Marker({        
    	position: {lat: 41.890653, lng: -87.626988},
    		map,
      	});
	}
	handleChange = (e) =>{
		console.log(e.currentTarget.value)
		this.setState({addressToBeGeocoded: e.currentTarget.value})

	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.addFunction(this.state.addressToBeGeocoded);
	
	}
	render() {


		const style = {
      	width: '100%',
      	height: '100%',
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
	      <input type="text" value={this.state.addressToBeGeocoded} /> 
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
	        			text={ "Default Map Center at State and Madison" }
	          		/>
	        </GoogleMapReact>
	      </div>
	    )
  

	}

}

export default IncidentMap;
