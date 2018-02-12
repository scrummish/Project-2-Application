import React, { Component } from 'react';
import APIKEY from './config.js'
import GoogleMapReact from 'google-map-react'

import nodeGeocode from 'node-geocoder'


const request = require('superagent');




const options = {
  provider: 'google',
 
  
  httpAdapter: 'https', 
  apiKey: APIKEY, 
  formatter: null        
};


class IncidentMap extends Component {
	constructor(){
		super()
  
      

    
 
		this.state = {
			selectedPlace: "GA",
			address: "444 N. Wabash, Chicago, Il",
			latitudes: [41.89055],
     		longitudes: [-87.626847],
     		center: {lat: 41.8781, lng: -87.6298},
      		zoom: 15

		}
	}
	static defaultProps = {
	    center: { lat: 40.7446790, lng: -73.9485420 },
	    zoom: 11
	  }
	// getLatitude = (latitude) => {
	//     const state = this.state
	//     state.setState({latitudes: [...this.state.latitudes, latitude]})
	// }
	// getLongitude = (longitude) => {
	//     const state = this.state
	//     state.setState({longitudes: [...this.state.longitudes, longitude]})
	// }
	// getCoordinates = () => {

	// 	const geocoder = nodeGeocode(options)

	// 	geocoder.geocode(this.state.address, (error, response)=>{
	// 		console.log("This is the response for the geocoder", response)
	// 		this.getLatitude(response[0].latitude)
	// 		this.getLongitude(response[0].longitude)
	// 	})

	// }
	render() {

		const AnyReactComponent = ({ text }) => <div>{ text }</div>;
	    return (
	      <div className='google-map'>
	      say something
	        <GoogleMapReact
	       		 defaultCenter={ this.props.center }
	       		 defaultZoom={ this.props.zoom }
	       		 bootstrapURLKeys={{
	                 key: APIKEY,
	                 language: 'en'
                 }}>
	        		<AnyReactComponent
	        			lat={ 40.7473310 }
	        			lng={ -73.8517440 }
	        			text={ "Where's Waldo?" }
	          		/>
	        </GoogleMapReact>
	      </div>
	    )
  

	}

}

export default IncidentMap;
