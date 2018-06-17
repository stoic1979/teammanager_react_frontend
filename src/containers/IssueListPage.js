import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { grey500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn } from 'material-ui/Table';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import { resolve } from "react-resolver";

import { connect } from 'react-redux';
import {projectActions} from '../actions';
import {issueActions} from '../actions';

import { Link } from 'react-router-dom';


const styles={
 flatBtn: {
    fill: grey500,
    float: 'right',
  },
  main:{
    marginLeft:20,
  },
};


// @resolve("project", function(props) {
//   const {dispatch} = this.props;
//   return dispatch(projectActions.getSelectedProject());
//   // dispatch(projectActions.getAll());
// })

//---------------------------------------------------
//
//         ISSUE LIST PAGE
//
//---------------------------------------------------

class IssueListPage extends React.Component {

  constructor(props){
    super(props)
      this.state = {
      id:'',
      project:''
    }
    console.log('[constructor]' +JSON.stringify(this.state));

  }
  componentWillMount(){
    const {dispatch} = this.props;
    dispatch(projectActions.getAll());
  }

  componentDidMount() {

    const {dispatch} = this.props;
    dispatch(projectActions.getAll());

    var p_id ;
    var project = this.state;

    console.log('[componentDidMount] state '+JSON.stringify(project));
    console.log('[componentDidMount] projects'+JSON.stringify(this.props.projects));
    console.log('[componentDidMount] latest_project '+JSON.stringify(this.props.latest_project));
    console.log('[componentDidMount] selectedProject'+JSON.stringify(this.props.selectedProject));

    if(this.props.selectedProject){
      p_id = this.props.selectedProject;
      console.log('[componentDidMount] selectedProject p_id '+p_id);
    }
    else if (localStorage.getItem('project_id')){
      p_id = localStorage.getItem('project_id');
      console.log('[componentDidMount] localStorage p_id '+p_id);
    }
    else if (this.props.latest_project){
      p_id = this.props.latest_project._id;
      console.log('[componentDidMount] latest_project p_id '+p_id);
    }
    else {
      // FIX ME LATER
    }

    var issues = dispatch(issueActions.getAll(p_id));
    this.handleCellClick = this.handleCellClick.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    var p_id;

    if(nextProps.latest_project){

      var p_id = nextProps.latest_project._id;
      console.log('[componentWillReceiveProps] latest_project  '+JSON.stringify(nextProps.latest_project._id));
    }

    this.setState({id: p_id});
  }

   // -----------------------------
  // handleCellClick
  // -----------------------------

  handleCellClick(row,column,event){

    const {dispatch} = this.props;
    var issue = '';

    if(column == 6){
      for (var i = 0; i < this.props.issues.length; i++) {
        console.log(`[handleCellClick] :${  JSON.stringify(this.props.issues[i])}`);

        if( i == row) {
          var issue = this.props.issues[i];
          issue = issue._id;
        }

        dispatch(issueActions.selectedIssue(issue));
        console.log('[handleCellClick] issue_id '+issue);
        localStorage.setItem('issue_id',issue);
        this.props.history.push('/editIssue');
      }
    }
    else {
      for (var i = 0; i < this.props.issues.length; i++) {
        console.log(`[handleCellClick] :${  JSON.stringify(this.props.issues[i])}`);

        if( i == row) {
          var issue = this.props.issues[i];
          issue = issue._id;
        }

        dispatch(issueActions.selectedIssue(issue));
        console.log('[handleCellClick] issue_id '+issue);
        localStorage.setItem('issue_id',issue);
      }
    }
    console.log('cell clicked of row '+row +" and column "+column);
  }

  render() {
    const {project} =this.props;
   console.log('project '+project);
    // console.log(`---> render got projects: ${  JSON.stringify(this.props.projects)}`);
    if(this.props.latest_project){
      var c = JSON.stringify(this.props.latest_project.title);
      console.log('[Issue List] latest_project+ '+c);
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
            <TableRowColumn><Edit/></TableRowColumn>
          </TableRow>
          );
        }
      }

      return (
        <MuiThemeProvider>
          <center>{this.props.alert.message}</center>
          <div style={styles.main}>
           <FlatButton
              label="All Projects"
              style={styles.flatBtn}
              containerElement={<Link to="/projectList" />}
           />
            <FlatButton
                label="New Issue"
                style={styles.flatBtn}
                containerElement={<Link to="/createIssue" />}
            />
            <h2>Issues</h2>
            <Table onCellClick = {this.handleCellClick} >
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn style={{width: '5px'}}>#</TableHeaderColumn>
                    <TableHeaderColumn>Summary</TableHeaderColumn>
                    <TableHeaderColumn>Assignee</TableHeaderColumn>
                    <TableHeaderColumn>Type</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                    <TableHeaderColumn>Priority</TableHeaderColumn>
                    <TableHeaderColumn>Edit</TableHeaderColumn>
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
  // console.log(`---> IssueListPage got state: ${  JSON.stringify(state.projects.selectedProject)}` );
  return {
    alert,
    projects: state.projects.projects,
    latest_project: state.projects.latest_project,
    selectedProject: state.projects.selectedProject,
    issues:state.issues
  };
}

const connectedIssueListPage = connect(mapStateToProps)(IssueListPage);
export { connectedIssueListPage as IssueListPage };
