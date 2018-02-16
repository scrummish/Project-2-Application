import React, { Component } from 'react';
import APIKEY from './config.js'
import GoogleMapReact from 'google-map-react'
import './css/IncidentMap.css'
import DrawerMenu from './DrawerMenu'

const request = require('superagent');

const defaultMapCenter = {lat: 41.882059,lng: -87.627815};
const defaultZoom = 11;
const checkStringArray = ["west", "east", "north", "south", "w.", "n."]

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
      		addressToBeGeocoded: "",
      		reRender: false,
      		markers: [],
      		map: '',
      		maps: ''
		}
	}
	toggleState = () => {
		this.setState({reRender: !this.state.reRender})
	}

	addCoordinate = (lat, long) => {
		console.log("addCoordinate called with lat " + lat + " and long " + long);
		this.setState({
			latitudes: [...this.state.latitudes, lat],
			longitudes: [...this.state.longitudes, long]
		})
	}
	renderMarkers = (map, maps, latitude, longitude) => {
			const marker = new maps.Marker({ 	       
		    	position: {lat: latitude , lng: longitude},
		    		map,
	      	});
	  		const state = this.state;
	  		state.map = map;
	  		state.maps = maps;
	  		this.setState(state)
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
	componentWillMount() {

		let responseJSON = []
		request
			.get('https://desolate-sierra-97938.herokuapp.com/incident')
			.end((error, response)=>{
				responseJSON = JSON.parse(response.text)
				const state = this.state;
				for(let i = 0; i<responseJSON.length; i++){ 
					state.latitudes.push(responseJSON[i].latitude)
					state.longitudes.push(responseJSON[i].longitude)
				}
				this.setState(state)
			})
	}
	render() {
// the following code is for experimenting with style of the map and markers at a later time
		const style = {
      	width: '100%',
      	height: '100%'
   		 }
		const MARKER_SIZE = 40;
		const greatPlaceStyle = {
  		position: 'absolute',
  		width: MARKER_SIZE,
  		height: MARKER_SIZE,
  		left: -MARKER_SIZE / 2,
  		top: -MARKER_SIZE / 2
		}
		if(this.state.map != ''){
			const maps = this.state.maps
			const map = this.state.map
			const markers = this.state.latitudes.map((lat, i) => {
				return  new maps.Marker({ 	       
			    	position: {lat: lat, lng: this.state.longitudes[i]},
			    		map
			      	});
			})
		}
	    return (
	      <div className='google-map'>
	      <DrawerMenu toggleState={this.toggleState} addCoordinate={this.addCoordinate} userId={this.props.userId}/>
	      <GoogleMapReact defaultCenter={defaultMapCenter} defaultZoom={ defaultZoom }
	       		 bootstrapURLKeys={{
	                 key: APIKEY,
	                 language: 'en'
                 }}
                 onGoogleApiLoaded={({map, maps}) => {
                 	console.log('api being loaded called')
                 	for (let i = 0; i < this.state.latitudes.length; i++) {
                 		console.log(this.props.userId)
                 		this.renderMarkers(map, maps, this.state.latitudes[i], this.state.longitudes[i])
                 	}
                 }}
				 >	
				 {this.state.markers}
	     </GoogleMapReact>
	     </div>
	    )
	}
}

export default IncidentMap;
