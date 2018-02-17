import React, { Component } from 'react';
import SignInScreen from './SignInScreen'
import IncidentMap from './IncidentMap'
import './css/App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
     signedin: false,
     toggleFormError: false,
     submissionAddress: "",
     userId: ""
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
  render() {
    return (
      <div className="App">
        {this.state.signedin ? <IncidentMap userId={this.state.userId} address={this.state.submissionAddress}/> : <SignInScreen loginSuccess={this.loginSuccess} reRenderForm={this.reRenderForm} toggleFormError={this.state.toggleFormError}/>}
      </div>
    );
  }
}

export default App;