import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';

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
class ProjectPage extends React.Component {
  constructor(props){
    super(props);

  }    

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
    // dispatch(projectActions.selectedProject(key));

    console.log("row is selected, key=" + key);
    // this.props.history.push('/');
  };


  render() {
    // var  studies = JSON.parse(localStorage.getItem('studies'));
    // console.log("props: " +this.props);
    console.log(`---> ProjectPage render got projects: ${  JSON.stringify(this.props.projects)}`);
    console.log(`---> ProjectPage render got selected project: ${  JSON.stringify(this.props.selectedProject)}`);


    var tableBody = [];
    if (this.props.projects) {
      for (var i = this.props.selectedProject; i <=this.props.projects[i]; i++) {
        console.log(`projects ${  i + 1  }:${  JSON.stringify(this.props.projects[i])}`);
        var project = this.props.projects[i];
        tableBody.push(
          <TableRow key={i+1} >
              console.log("got project: " + project.created_at);
            <TableRowColumn >{project._id}</TableRowColumn>
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
                    <TableHeaderColumn >#</TableHeaderColumn>
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
  console.log(`---> ProjectPage got state: ${  JSON.stringify(state)}` );
  return {
   projects: state.projects,
   selectedProject: state.selectedProject
 };
}
 
const connectedProjectPage = connect(mapStateToProps)(ProjectPage);
export { connectedProjectPage as ProjectPage };
