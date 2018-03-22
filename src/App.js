import React, { Component } from 'react';
import SignInScreen from './SignInScreen'
import IncidentMap from './IncidentMap'
import './css/App.css';

const request = require('superagent');

class App extends Component {
  constructor(){
    super();

    this.state = {
     signedin: false,
     toggleFormError: false,
     submissionAddress: "",
     userId: "",
      latitudes: [],
      longitudes: []
    }
  }
  loginSuccess = (id)=>{
    this.setState({signedin: true, userId: id})
  }
  reRenderForm = ()=>{
    this.setState({toggleFormError: true})
  }
  getAddress = (address) => {
    this.setState({submissionAddress: address})
  }
  componentDidMount() {
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
        console.log(responseJSON)
        this.setState(state)
      })
  }
  render() {
    return (
      <div className="App">
        {this.state.signedin ? <IncidentMap  lat={this.state.latitudes} long={this.state.longitudes} userId={this.state.userId} address={this.state.submissionAddress}/> : <SignInScreen loginSuccess={this.loginSuccess} reRenderForm={this.reRenderForm} toggleFormError={this.state.toggleFormError}/>}
      </div>
    );
  }
}

export default App;