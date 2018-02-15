import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Modal from './createReport'

const style = {
  position: "absolute",
  zIndex: 100
}

class DrawerMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      edit: false
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});

  
  handleEdit = () =>{
    this.setState({open: false, edit: true});
    console.log(this.props.userId)
  } 
  handleClose = () => this.setState({edit: !this.state.edit});

  render() {
    return (
      <div>
  	    <MuiThemeProvider muiTheme={getMuiTheme()}>
  	        <RaisedButton label="MENU" onClick={this.handleToggle} style={style}/>
  	        <Drawer
  	          docked={false}
  	          width={200}
  	          open={this.state.open}
  	          onRequestChange={(open) => this.setState({open})}>
  	          <MenuItem onClick={this.handleEdit}>Report an Incident</MenuItem>
  	        </Drawer>
  	    </MuiThemeProvider>
        {this.state.edit ?  <Modal userId={this.props.userId} handleClose={this.handleClose}/> : null}
      </div>
    );
  }
}

export default DrawerMenu;