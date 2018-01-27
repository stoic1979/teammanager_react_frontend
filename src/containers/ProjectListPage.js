import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { grey500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';

import { connect } from 'react-redux';
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

//---------------------------------------------------
//
//         PROJECT LIST PAGE
//
//---------------------------------------------------

class ProjectListPage extends React.Component {

  componentDidMount() {
    const {dispatch} = this.props;
    var resp = dispatch(projectActions.getAll());

    this.handleRowSelection = this.handleRowSelection.bind(this); 
  }

  // --------------------------------
  // handleRowSelection
  // --------------------------------

  handleRowSelection = (key) => {
    const {dispatch} = this.props;
    var project_id='';

    if (this.props.projects) {
      for (var i = key; i <=this.props.projects[i]; i++) {
        console.log(`abc++++ :${  JSON.stringify(this.props.projects[i])}`);
        var project = this.props.projects[i];
        project_id=project._id;
      }
    }
    console.log('xyz '+project_id);
    dispatch(projectActions.selectedProject(project_id));

    console.log("ProjectListPage :: row is selected, key=" + key);
    localStorage.setItem('project_id',project_id);

    this.props.history.push('/issueList');
  };
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
            <TableRowColumn>{project.created_at}</TableRowColumn>
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
                href="/createProject"
            />
            <h2>Projects</h2>
            <Table onRowSelection={this.handleRowSelection} >
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={{width: '5px'}}>#</TableHeaderColumn>
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Description</TableHeaderColumn>
                  <TableHeaderColumn>Manager</TableHeaderColumn>
                  <TableHeaderColumn>Created At</TableHeaderColumn>
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
    projects: state.projects
  };
}

const connectedProjectListPage = connect(mapStateToProps)(ProjectListPage);
export { connectedProjectListPage as ProjectListPage };
