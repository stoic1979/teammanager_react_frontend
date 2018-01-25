import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {grey500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn,} from 'material-ui/Table';

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
  customWidth: {
    width: 150,
  },
};

//---------------------------------------------------
//
//         ISSUE LIST PAGE
//
//---------------------------------------------------

class IssueListPage extends React.Component {
  constructor(props){
    super(props);

    this.state={
      selectedProject:'',
      project:'',
    }
  }    

  componentDidMount() {
    var project_id = '';
    if (this.props.projects) {
      for (var i = this.props.selectedProject; i <=this.props.projects[i]; i++) {
        console.log(`projects :${  JSON.stringify(this.props.projects[i])}`);
        var project = this.props.projects[i];
        project_id=project._id;
      }
    }
    console.log("selected project id in componentDidMount " +project_id); 

    const {dispatch} = this.props;
    var resp = dispatch(projectActions.getAll());

    var issues = dispatch(issueActions.getAll(project_id));

    this.handleRowSelection = this.handleRowSelection.bind(this); 
    this.handleProject      = this.handleProject.bind(this); 
  }

  // -----------------------------------------
  // handleRowSelection
  // -----------------------------------------
  handleRowSelection = (key) => {
    const {dispatch} = this.props;
   console.log("row is selected, key=" + key);
   };

   //----------------------------------------------- -
   //  handle project id selected by user
   // -----------------------------------------------
  handleProject = (event, index, value) => this.setState({project:value});

  render() {
   var key = JSON.parse(localStorage.getItem('project_id'));
    var item=[];
    if (this.props.projects) {
      for (var i = 0; i < this.props.projects.length; i++) {
        var pro = this.props.projects[i];
        if(i==key){
          var project_name=pro.title;
        }
      }
    }
     
   var tableBody = [];
    if (this.props.issues) {
      for ( i = 0; i < this.props.issues.length; i++) {
        var issue = this.props.issues[i];
        tableBody.push(
          <TableRow key={i+1} >
            <TableRowColumn style={{width: '50px'}}>{i+1}</TableRowColumn>
            <TableRowColumn>{issue.summary}</TableRowColumn>
            <TableRowColumn>{issue.assignee.first_name} {issue.assignee.last_name}</TableRowColumn>
            <TableRowColumn>{issue.type} </TableRowColumn>
            <TableRowColumn>{issue.status}</TableRowColumn>
            <TableRowColumn>{issue.priority}</TableRowColumn>
          </TableRow>
          );
        }
      }
    const project=this.state;
      return (
        <MuiThemeProvider>
          {this.props.alert.message}
          <div style={styles.main}>
            <FlatButton
                label="New Issue"
                style={styles.flatBtn}
                href="/createIssue"
              />
            
            <h2>  Issues  </h2>
            <Table onRowSelection={this.handleRowSelection} >
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn style={{width: '50px'}}>#</TableHeaderColumn>
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
          }
      </MuiThemeProvider>
      );
    }
  }

function mapStateToProps(state) {
  const {alert} = state;
  // console.log(`---> IssueListPage got issues: ${  JSON.stringify(state.issues)}` );
  return {
    alert,
    projects: state.projects,
    selectedProject: state.selectedProject,
    issues:state.issues
  };
}
 
const connectedIssueListPage = connect(mapStateToProps)(IssueListPage);
export { connectedIssueListPage as IssueListPage };
