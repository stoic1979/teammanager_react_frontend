import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { grey500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import Edit from 'material-ui/svg-icons/editor/mode-edit';

import { connect } from 'react-redux';
import {projectActions} from '../actions';

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

//---------------------------------------------------
//
//         PROJECT LIST PAGE
//
//---------------------------------------------------

class ProjectListPage extends React.Component {

  componentDidMount() {
    const {dispatch} = this.props;
    var resp = dispatch(projectActions.getAll());

    this.handleCellClick = this.handleCellClick.bind(this);
  }

  // -----------------------------
  // handleCellClick
  // -----------------------------

  handleCellClick(row,column,event){

    const {dispatch} = this.props;
    var project = '';
    var project_title = '';

    if(column == 6){
      for (var i = 0; i < this.props.projects.length; i++) {
        console.log(`[handleCellClick] :${  JSON.stringify(this.props.projects[i])}`);

        if( i == row) {
          var pro = this.props.projects[i];
          project=pro._id;
          project_title = pro.title;
        }

        dispatch(projectActions.selectedProject(project));
        console.log('[handleCellClick] project_id '+project + " and project_title "+project_title);
        localStorage.setItem('project_id',project);
        localStorage.setItem('project_title',project_title);
        this.props.history.push('/editProject');
      }
    }

    else if (this.props.projects) {
      console.log('[handleCellClick] ' +row);
      for (var i = 0; i < this.props.projects.length; i++) {
        console.log(`[handleCellClick] :${  JSON.stringify(this.props.projects[i])}`);
        if( i == row) {
          var pro = this.props.projects[i];
          project=pro._id;
          project_title = pro.title;
        }

        dispatch(projectActions.selectedProject(project));
        console.log('[handleCellClick] project_id '+project + " and project_title "+project_title);
        localStorage.setItem('project_id',project);
        localStorage.setItem('project_title',project_title);
        this.props.history.push('/issueList');
      }
    }


    console.log('cell clicked of row '+row +" and column "+column);
  }

  render() {

    // console.log(`---> render got projects: ${  JSON.stringify(this.props.projects)}`);

    var tableBody = [];
    if (this.props.projects) {
      for (var i = 0; i < this.props.projects.length; i++) {
        // console.log(`projects ${  i + 1  }:${  JSON.stringify(this.props.projects[i])}`);
        var project = this.props.projects[i];
        tableBody.push(
          <TableRow key={i+1} >
            <TableRowColumn style={{width: '5px'}}>{i+1}</TableRowColumn>
            <TableRowColumn>{project.title}</TableRowColumn>
            <TableRowColumn>{project.description}</TableRowColumn>
            <TableRowColumn>{project.manager.first_name} {project.manager.last_name}</TableRowColumn>
            <TableRowColumn>{project.start_date}</TableRowColumn>
            <TableRowColumn>{project.end_date}</TableRowColumn>
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
                label="New Project"
                style={styles.flatBtn}
                containerElement={<Link to="/createProject" />}
            />
            <h2>Projects</h2>
            <Table onCellClick = {this.handleCellClick}  >
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow >
                  <TableHeaderColumn style={{width: '5px'}}>#</TableHeaderColumn>
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Description</TableHeaderColumn>
                  <TableHeaderColumn>Manager</TableHeaderColumn>
                  <TableHeaderColumn>Start Date</TableHeaderColumn>
                  <TableHeaderColumn>End Date</TableHeaderColumn>
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
  // console.log(`---> ProjectList got state: ${  JSON.stringify(state.projects)}` );
  return {
    alert,
    projects: state.projects.projects,
    latest_project: state.projects.latest_project
  };
}

const connectedProjectListPage = connect(mapStateToProps)(ProjectListPage);
export { connectedProjectListPage as ProjectListPage };
