import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Modal from './createReport'
import ShowIncidents from './ShowIncidents'
import Divider from 'material-ui/Divider';
import EditUser from './EditUser'

const style = {
  position: "absolute",
  zIndex: 100
}

class DrawerMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      modal: false,
      incidents: false,
      editUser: false
    };
  }

  handleDrawerToggle = () => this.setState({open: !this.state.open});
  handleModalToggle = () => this.setState({modal: !this.state.modal});
  handleIncidentsToggle = () => this.setState({incidents: !this.state.incidents});
  handleEditUserToggle = () => this.setState({editUser: !this.state.editUser});

  handleModal = () =>{
    this.setState({open: false, modal: true});
  } 
  handleIncident = () =>{
    this.setState({open: false, incidents: true});
  }
  handleEditUser = () =>{
    this.setState({open: false, editUser: true});
  }

  render() {
    return (
      <div>
  	    <MuiThemeProvider muiTheme={getMuiTheme()}>
  	        <RaisedButton label="MENU" onClick={this.handleDrawerToggle} style={style}/>
  	        <Drawer
  	          docked={false}
  	          width={200}
  	          open={this.state.open}
  	          onRequestChange={(open) => this.setState({open})}>
  	          <MenuItem onClick={this.handleModal}>Report an Incident</MenuItem>
              <MenuItem onClick={this.handleIncident}>See My Incidents</MenuItem>
              <Divider/>
              <MenuItem onClick={this.handleEditUser}>Edit Profile</MenuItem>
  	        </Drawer>
  	    </MuiThemeProvider>
        {this.state.modal ?  <Modal toggleState={this.props.toggleState} userId={this.props.userId} handleClose={this.handleModalToggle} addCoordinate={this.props.addCoordinate} /> : null}
        {this.state.incidents ?  <ShowIncidents userId={this.props.userId} handleClose={this.handleIncidentsToggle}/> : null}
        {this.state.editUser ? <EditUser userId={this.props.userId} handleClose={this.handleEditUserToggle}/> : null}
      </div>
    );
  }
}

export default DrawerMenu;