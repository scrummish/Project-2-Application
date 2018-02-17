import React, { Component } from 'react';
import APIKEY from './config.js'
import GoogleMapReact from 'google-map-react'
import './css/IncidentMap.css'
import DrawerMenu from './DrawerMenu'

const request = require('superagent');

const defaultMapCenter = {lat: 41.882059,lng: -87.627815};
const defaultZoom = 11;

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

	// Used to immediately add new markers created by the user
	addCoordinate =(lat,long)=>{
		this.setState({
			latitudes: [...this.state.latitudes, lat],
			longitudes: [...this.state.longitudes, long]
		})
	}

	renderMarkers = (map, maps, latitude, longitude) => {
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
			.get('https://afternoon-anchorage-72517.herokuapp.com/incident')
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
		if(this.state.map !== ''){
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
	      <GoogleMapReact yesIWantToUseGoogleMapApiInternals={true} defaultCenter={defaultMapCenter} defaultZoom={ defaultZoom }
	       		 bootstrapURLKeys={{
	                 key: 'AIzaSyBv4XEWXSKVDA_fhgyp3kC82wThb7xa1Vw',
	                 language: 'en'
                 }}
                 onGoogleApiLoaded={({map, maps}) => {
                 	for (let i = 0; i < this.state.latitudes.length; i++) {
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
