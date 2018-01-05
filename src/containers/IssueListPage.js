import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
class IssueListPage extends React.Component {
  constructor(props){
    super(props);

    this.state={
      // selectedProject:'',
      project:'',
    }

  }    

  componentDidMount() {

    var selectedProject = '';
    if (this.props.projects) {
      for (var i = this.props.selectedProject; i <=this.props.projects[i]; i++) {
        console.log(`projects :${  JSON.stringify(this.props.projects[i])}`);
        var project = this.props.projects[i];
        selectedProject=project._id;
       }
     }
    console.log("selected project id in componentDidMount " +selectedProject); 

    const {dispatch} = this.props;
    
    var resp = dispatch(projectActions.getAll());

    var issues = dispatch(issueActions.getAll(selectedProject));

    this.handleRowSelection = this.handleRowSelection.bind(this); 
    this.handleProject      = this.handleProject.bind(this); 

    }

  // ------------------------
  // handleRowSelection
  // ------------------------
  handleRowSelection = (key) => {
    const {dispatch} = this.props;
   console.log("row is selected, key=" + key);
   };

   //  handle project id selected by user

  handleProject = (event, index, value) => this.setState({project:value});

  render() {
    var item=[];
    if (this.props.projects) {
      for (var i = 0; i < this.props.projects.length; i++) {
        // console.log(`projects ${  i + 1  }:${  JSON.stringify(this.props.projects[i])}`);
        var pro = this.props.projects[i];
        item.push(
          <MenuItem value={pro._id} primaryText={pro.title} />
          );
       }
     }
     
   var tableBody = [];
    if (this.props.issues) {
      for (var i = 0; i < this.props.issues.length; i++) {
        // console.log(`issues ${  i + 1  }:${  JSON.stringify(this.props.issues[i])}`);
        var issue = this.props.issues[i];
        tableBody.push(
          <TableRow key={i+1} >
            // console.log("got project: " + issue.created_at);
            <TableRowColumn style={{width: '50px'}}>{i+1}</TableRowColumn>
            <TableRowColumn>{issue.summary}</TableRowColumn>
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
          <div style={styles.main}>
            <SelectField
              floatingLabelText="Project "
              name="project"
              value={this.state.project}
              onChange={this.handleProject}
              style={styles.customWidth}
            >
              {item}
            </SelectField>
            <FlatButton
                label="New Issue"
                style={styles.flatBtn}
                href="/createIssue"
              />
            <h2>Issues</h2>
            <Table onRowSelection={this.handleRowSelection} >
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn style={{width: '50px'}}>#</TableHeaderColumn>
                    <TableHeaderColumn>Summary</TableHeaderColumn>
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
  console.log(`---> IssueListPage got state: ${  JSON.stringify(state)}` );
  return {
   projects: state.projects,
   selectedProject: state.selectedProject,
   issues:state.issues
 };
}
 
const connectedIssueListPage = connect(mapStateToProps)(IssueListPage);
export { connectedIssueListPage as IssueListPage };
