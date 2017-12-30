import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { grey500} from 'material-ui/styles/colors';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {projectActions} from '../actions';


const styles={
 flatBtn: {
    fill: grey500,
    float: 'right',
  },
  main:{
    marginLeft:20,
  },
};


class TeamListPage extends React.Component {
  

  componentDidMount() {
    const {dispatch} = this.props;

    var resp = dispatch(projectActions.getAll());

    this.handleRowSelection = this.handleRowSelection.bind(this); 
  }

  // ------------------------
  // handleRowSelection
  // ------------------------
  handleRowSelection = (key) => {
    const {dispatch} = this.props;
    dispatch(projectActions.selectedProject(key));

    console.log("ProjectListPage :: row is selected, key=" + key);
      localStorage.setItem('project_id',key);
       

     // this.props.history.push('/project');
  };


  render() {
    // var  studies = JSON.parse(localStorage.getItem('studies'));
    // console.log("props: " +this.props);
    console.log(`---> render got projects: ${  JSON.stringify(this.props.projects)}`);

    var tableBody = [];
    if (this.props.projects) {
      for (var i = 0; i < this.props.projects.length; i++) {
        console.log(`projects ${  i + 1  }:${  JSON.stringify(this.props.projects[i])}`);
        var project = this.props.projects[i];
        tableBody.push(
          <TableRow key={i+1} >
              console.log("got project: " + project.created_at);
            <TableRowColumn style={{width: '50px'}}>{i+1}</TableRowColumn>
            <TableRowColumn>{project.name}</TableRowColumn>
           
            <TableRowColumn>{project.manager.first_name} {project.manager.last_name}</TableRowColumn>
            

          </TableRow>
                );
      }
    }

      return (
        <MuiThemeProvider>
          <div style={styles.main}>
            <FlatButton
                label="New Team"
                style={styles.flatBtn}
                href="/createTeam"
              />
            <h2>Team</h2>
              <Table onRowSelection={this.handleRowSelection} >
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                      <TableHeaderColumn style={{width: '50px'}}>#</TableHeaderColumn>
                      <TableHeaderColumn>Name</TableHeaderColumn>
                      <TableHeaderColumn>Manager</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    {tableBody}
                  </TableBody>
                </Table>
            
          </div>
      </MuiThemeProvider>
      );
    }
  }

function mapStateToProps(state) {
  console.log(`---> ProjectList got state: ${  JSON.stringify(state.projects)}` );
  return {
   projects: state.projects
 };
}
 
const connectedTeamListPage = connect(mapStateToProps)(TeamListPage);
export { connectedTeamListPage as TeamListPage };
