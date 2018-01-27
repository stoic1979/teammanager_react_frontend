import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { grey500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';

import { connect } from 'react-redux';
import {projectActions} from '../actions';
import {issueActions} from '../actions';

const styles={
 flatBtn: {
    fill: grey500,
    float: 'right',
  },
  main:{
    marginLeft:20,
  },
};

//---------------------------------------------------
//
//         ISSUE LIST PAGE
//
//---------------------------------------------------

class IssueListPage extends React.Component {

  componentDidMount() {
  
  var p_id = '';

    if(this.props.current_project){
      var c = JSON.stringify(this.props.current_project);
      console.log('current_project--> '+c);
    }
    if(this.props.selectedProject){ 
      p_id = this.props.selectedProject;
      console.log('------p_id++ '+p_id);
    }
    else if (localStorage.getItem('project_id')){
      p_id = localStorage.getItem('project_id');
      console.log('--------p_id -----> '+localStorage.getItem('project_id'));
     }
    else {
      // Fix me Later
     }

    const {dispatch} = this.props;
    var issues = dispatch(issueActions.getAll(p_id));
    this.handleRowSelection = this.handleRowSelection.bind(this); 
  }

  // --------------------------------
  // handleRowSelection
  // --------------------------------

  handleRowSelection = (key) => {
    
  };
  render() {

    // console.log(`---> render got projects: ${  JSON.stringify(this.props.projects)}`);
    if(this.props.current_project){
      var c = JSON.stringify(this.props.current_project);
      console.log('current_project+ '+c);
    }
   var tableBody = [];
    if (this.props.issues) {
      for ( var i = 0; i < this.props.issues.length; i++) {
        var issue = this.props.issues[i];
        tableBody.push(
          <TableRow key={i+1} >
            <TableRowColumn style={{width: '5px'}}>{i+1}</TableRowColumn>
            <TableRowColumn>{issue.summary}</TableRowColumn>
            <TableRowColumn>{issue.assignee.first_name} {issue.assignee.last_name}</TableRowColumn>
            <TableRowColumn>{issue.type} </TableRowColumn>
            <TableRowColumn>{issue.status}</TableRowColumn>
            <TableRowColumn>{issue.priority}</TableRowColumn>
          </TableRow>
          );
        }
      }

      return (
        <MuiThemeProvider>
          <center>{this.props.alert.message}</center>
          <div style={styles.main}>
            <FlatButton
                label="New Issue"
                style={styles.flatBtn}
                href="/createIssue"
            />
            <h2>Issues</h2>
            <Table onRowSelection={this.handleRowSelection} >
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn style={{width: '5px'}}>#</TableHeaderColumn>
                    <TableHeaderColumn>Summary</TableHeaderColumn>
                    <TableHeaderColumn>Assignee</TableHeaderColumn>
                    <TableHeaderColumn>Type</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                    <TableHeaderColumn>Priority</TableHeaderColumn>
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
  const {alert} = state;
  console.log(`---> IssueListPage got state: ${  JSON.stringify(state)}` );
  return {
    alert,
    projects: state.projects.projects,
    current_project: state.projects.current_project,
    selectedProject: state.selectedProject,
    issues:state.issues
  };
}

const connectedIssueListPage = connect(mapStateToProps)(IssueListPage);
export { connectedIssueListPage as IssueListPage };
