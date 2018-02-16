import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const REQUEST = require('superagent');
const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

class IncidentTable extends Component {
  constructor() {
    super();

    this.state = {
      height: '600',
      collectedIncidents: '',
      checkedRows: '',
      deleteIncidents: false
    }
  }

  handleChange = (event) => {
    this.setState({height: event.target.value});
  }
  handleDeletes = (id)=>{
      REQUEST.delete('https://afternoon-anchorage-72517.herokuapp.com/incident/delete/'+id)
      .end((err,returnedData)=>{
        this.props.handleClose();
      })
  }
  handleChecked = (e)=>{
    const id = this.state.collectedIncidents[e[0]].props.id;
      this.handleDeletes(id)
  }
  componentDidMount(){
    console.log(this.props.userId)
      REQUEST.get('https://afternoon-anchorage-72517.herokuapp.com/incident/'+this.props.userId+'/myIncidents')
      .end((err,returnedData)=>{
        const parsedData = JSON.parse(returnedData.text);
        const parsedIncidents = parsedData.incidents;
        const tableRows = parsedIncidents.map( (row, index) => (
                <TableRow key={index} id={row.id}>
                  <TableRowColumn>{index}</TableRowColumn>
                  <TableRowColumn>{row.type_of_incident}</TableRowColumn>
                  <TableRowColumn>{row.incident_details}</TableRowColumn>
                  <TableRowColumn>{row.address}</TableRowColumn>
                  <TableRowColumn>{row.location_description}</TableRowColumn>
                </TableRow>
                ))
        this.setState({collectedIncidents: tableRows})
      })
  }
  render() {
    return (
      <div style={{position: 'relative', zIndex: 2000}}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Table height={this.state.height} fixedHeader={true} selectable={true} multiSelectable={true}  onRowSelection={this.handleChecked} >
            <TableHeader displaySelectAll={true} adjustForCheckbox={true} enableSelectAll={true}>
              <TableRow>
                <TableHeaderColumn colSpan="5" style={{textAlign: 'center'}}>
                  Reported Incidents by you
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Type Of Incident">Crime</TableHeaderColumn>
                <TableHeaderColumn tooltip="Details on the incident">What Happened?</TableHeaderColumn>
                <TableHeaderColumn tooltip="The address or location">Location</TableHeaderColumn>
                <TableHeaderColumn tooltip="Quick description of the location">Location Details</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={true} deselectOnClickaway={true} showRowHover={true} stripedRows={true}>
              {this.state.collectedIncidents}
            </TableBody>
          </Table>
          <RaisedButton primary={true} onClick={this.props.handleClose} label="EXIT" style={{}} />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default IncidentTable