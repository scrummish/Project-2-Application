import React, { Component } from 'react';

class UserUpdate extends Component {

constructor(){
	
	this.state = {
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	}
}
handleChange = (e) => {
		
	this.setState(
		{
			firstName: e.currentTarget.value,
			lastName: e.currentTarget.value,
			email: e.currentTarget.value,
			password: e.currentTarget.value
		})


}
handleSubmit = (e) => {
	e.preventDefault()
	this.setState(
		{
			firstName: e.currentTarget.value,
			lastName: e.currentTarget.value,
			email: e.currentTarget.value,
			password: e.currentTarget.value
		})

		
}
componentWillMount() {

		let responseJSON = []
		request
			.get('https://afternoon-anchorage-72517.herokuapp.com/incident')
			.end((error, response)=>{
				console.log('this is response from server', response)
				responseJSON = JSON.parse(response.text)
				console.log('this is response.text in JSON from server', responseJSON)
				console.log("this is the error", error)

				const state = this.state;


				for(let i = 0; i<responseJSON.length; i++){ 
					state.latitudes.push(responseJSON[i].latitude)
					// this.getLatitude(responseJSON[i].latitude)
					// this.getLongitude(responseJSON[i].longitude)

					state.longitudes.push(responseJSON[i].longitude)
				}
				this.setState(state)
			})
			


	}
updateUserData = () => {

}




render(){

	return(
		<form>
		<label></label>
		<input type="text" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange}/>
		<label></label>
		<input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange}/>
		<label></label>
		<input type="text" placeholder="email" value={this.state.email} onChange={this.handleChange}/>
		<label></label>
		<input type="text" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
		</form>
		)
}



}

export default UserUpdate;