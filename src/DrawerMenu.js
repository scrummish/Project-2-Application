import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CreateReport from './createReport'
import ShowIncidents from './ShowIncidents'
import Divider from 'material-ui/Divider';
import EditUser from './EditUser'

const STYLE = {
  position: "absolute",
  zIndex: 100
}

class DrawerMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      createReport: false,
      incidents: false,
      editUser: false
    };
  }

  // These are passed down to the children components in order to allow closing functionality
  handleDrawerToggle = () => this.setState({open: !this.state.open});
  handleReportToggle = () => this.setState({createReport: !this.state.createReport});
  handleIncidentsToggle = () => this.setState({incidents: !this.state.incidents});
  handleEditUserToggle = () => this.setState({editUser: !this.state.editUser});

  // These are used to show the component that is clicked on
  showCreateReportComponent = () => this.setState({open: false, createReport: true});
  showIncidentsComponent = () => this.setState({open: false, incidents: true});
  showEditUserComponent = () => this.setState({open: false, editUser: true});
  
  render() {
    return (
      <div>
  	    <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
  	        <RaisedButton label="MENU" onClick={this.handleDrawerToggle} style={STYLE}/>
  	        <Drawer
  	          docked={false}
  	          width={200}
  	          open={this.state.open}
  	          onRequestChange={(open) => this.setState({open})}>
  	          <MenuItem onClick={this.showCreateReportComponent}>Report an Incident</MenuItem>
              <MenuItem onClick={this.showIncidentsComponent}>See My Incidents</MenuItem>
              <Divider/>
              <MenuItem onClick={this.showEditUserComponent}>Edit Profile</MenuItem>
  	        </Drawer>
          </div>
  	    </MuiThemeProvider>
        {this.state.createReport ?  <CreateReport addCoordinate={this.props.addCoordinate} userId={this.props.userId} handleClose={this.handleReportToggle}/> : null}
        {this.state.incidents ?  <ShowIncidents userId={this.props.userId} handleClose={this.handleIncidentsToggle}/> : null}
        {this.state.editUser ? <EditUser userId={this.props.userId} handleClose={this.handleEditUserToggle}/> : null}
      </div>
    );
  }
}

export default DrawerMenu;