import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Login from './Login'
import Register from './Register'
import './App.css';

const REQUEST = require('superagent');

class App extends Component {
	register = (formData)=>{
    	REQUEST.post('http://localhost:9292/user/')
    	.send(formData)
    	.end((err,createdUser)=>{
      		const parsedUser = JSON.parse(createdUser.text);
    	})
	}
  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Register register={this.register}/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;