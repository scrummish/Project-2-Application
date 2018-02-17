import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CreateReport from './createReport'

const STYLE = {
  position: "absolute",
  zIndex: 100
}

class DrawerMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      createReport: false
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});

  
  toggleCreateReport = () => this.setState({open: false, createReport: true});
  handleClose = () => this.setState({createReport: !this.state.createReport});

  render() {
    return (
      <div>
  	    <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
  	        <RaisedButton label="MENU" onClick={this.handleToggle} style={STYLE}/>
  	        <Drawer
  	          docked={false}
  	          width={200}
  	          open={this.state.open}
  	          onRequestChange={(open) => this.setState({open})}>
  	          <MenuItem onClick={this.toggleCreateReport}>Report an Incident</MenuItem>
  	        </Drawer>
          </div>
  	    </MuiThemeProvider>
        {this.state.createReport ?  <CreateReport addCoordinate={this.props.addCoordinate} userId={this.props.userId} handleClose={this.handleClose}/> : null}
      </div>
    );
  }
}

export default DrawerMenu;