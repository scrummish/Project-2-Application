import React, { Component } from 'react';
import APIKEY from './config.js'
import GoogleMapReact from 'google-map-react'
import './css/IncidentMap.css'
import Menu from './DrawerMenu'

const request = require('superagent');

const defaultMapCenter = {lat: 41.882059,lng: -87.627815};
const defaultZoom = 11;
let APIcallURL = ""

const GAlatitude = 41.890653;

const GAlongitude = -87.626988;



const checkStringArray = ["west", "east", "north", "south", "w.", "n."]


	     //  const positionObject = { 	       
	    	// position: {lat: 41.890653, lng: -87.626988},
	    	// 	map,
	     //  	}
//{({map, maps, latitude, longitude}) => this.renderMarkers(map, maps, 41.890653, -87.626988)}
class IncidentMap extends Component {
	constructor(props){
		super(props)

		this.state = {
			selectedPlace: "GA",
			submittedAddress: this.props.address,
			latitudes: [ 41.8781,41.881061, 41.868216],
     		longitudes: [-87.6298,-87.643521,-87.624395],
     		center: {lat: 41.8781, lng: -87.6298},
      		zoom: 15,
      		addressToBeGeocoded: ""
		}
	}
	getURL = () => {
	//	console.log('this is this.state.addressToBeGeocoded in get coord',this.state.addressToBeGeocoded);
		const address = this.state.addressToBeGeocoded;
		const addressArray = address.split(' ');
	//	console.log('this is address array', addressArray)
		let rootURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
		const apiKeyURLending = "&key=" + APIKEY;
	//	console.log('this is addressArray', addressArray)

		for(let i = 0; i<addressArray.length; i++){
			let noPlus = false
			for(let j=0; j<checkStringArray.length; j++){
				if(addressArray[i].toLowerCase() === checkStringArray[j].toLowerCase()){
					noPlus = true
				}
			}
			if(noPlus === true){
				rootURL = rootURL + addressArray[i]
				// i++;
			} else if(i===0){
			//	console.log('firstif triggered')
				rootURL = rootURL + addressArray[i] + '+'
			//	console.log('this is firstif address array length', addressArray.length)
			} else if (i>0 && (i !== addressArray.length-1)){
			//	console.log('secondif triggered')
				rootURL = rootURL + '+' + addressArray[i]
			//	console.log('this is rootURL', rootURL)
			//	console.log('this is i in secondif', i, 'when this is addressarray.length', addressArray.length)
			} else if (i===addressArray.length-1){
				rootURL = rootURL + '+' + addressArray[i]
			//	console.log('thirdif triggered')
			//	console.log('this is i in thirdif', i)
				APIcallURL = rootURL + apiKeyURLending;
				return APIcallURL
			}
		}


	}
	getCoordinates = {
	  // request
	  // 	.get('http://localhost:9292/incedent/create')
   //    	.send(formData)
   //    	.end((err,createdIncident)=>{
   //        console.log(createdIncident)
   //        this.props.handleClose();
   //    })
	}
	getLatitude = (latitude) => {
	    // console.log('this is latitude to be added to array', latitude)
	    this.setState({latitudes: [...this.state.latitudes, latitude]})
	     
	}
	getLongitude = (longitude) => {
	    
	    this.setState({longitudes: [...this.state.longitudes, longitude]})
	    // console.log(this.state.longitudes)
	}
	getCoordinates = () => {
		console.log('this is the URL for the API call',this.getURL())
		request
			.get(this.getURL())
			.end((error, response)=>{
				const responseJSON = JSON.parse(response.text)
				console.log('here is my JSON response.results',responseJSON.results)

				const latitude = responseJSON.results[0].geometry.location.lat;
				const longitude = responseJSON.results[0].geometry.location.lng;
				this.getLatitude(latitude);
				this.getLongitude(longitude);


			})


	}
	renderMarkers = (map, maps, latitude, longitude) => {
		console.log('this is latitude', latitude)
		console.log('this is longitude', longitude)
	  		const marker = new maps.Marker({ 	       
	    	position: {lat: latitude , lng: longitude},
	    		map,
	      	});

	      	// const marker = new maps.Marker(positionObject);
  		
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
	// test = ()=>{
	// 	for (var i = 0; i < this.state.latitudes.length; i++) {
	// 		console.log("I AM WORKING AS A CALLBACK", this.state.latitudes[i])
	// 			(map, maps, latitude, longitude) => this.renderMarkers(map, maps, this.state.latitudes[i], this.state.longitudes[i])

	// 	}
	// }
	
	render() {





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
	      <Menu userId={this.props.userId}/>

	        <GoogleMapReact defaultCenter={defaultMapCenter} defaultZoom={ defaultZoom }
	       		 bootstrapURLKeys={{
	                 key: APIKEY,
	                 language: 'en'
                 }}
                 onGoogleApiLoaded={({map, maps, latitude, longitude}) => {
                 	for (var i = 0; i < this.state.latitudes.length; i++) {
                 		this.renderMarkers(map, maps, this.state.latitudes[i], this.state.longitudes[i])
                 	}
                 }}
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
