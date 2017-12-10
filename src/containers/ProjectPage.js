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
    dispatch(projectActions.selectedProject(key));

    console.log("row is selected, key=" + key);
    this.props.history.push('/');
  };


  render() {
    // var  studies = JSON.parse(localStorage.getItem('studies'));
    // console.log("props: " +this.props);
    console.log(`---> render got projects: ${  JSON.stringify(this.props.projects)}`);

    var tableBody = [];
    if (this.props.projects) {
      
    }

      return (
        <MuiThemeProvider>
          <div>
            <FlatButton
                label="New Issue"
                style={styles.flatBtn}
                href="/createIssue"
              />
            <h2>Issues</h2>
              
            
          </div>
      </MuiThemeProvider>
      );
    }
  }

function mapStateToProps(state) {
  console.log(`---> ProjectPage got state: ${  JSON.stringify(state.projects)}` );
  return {
   projects: state.projects,
   selectedProject: state.selectedProject
 };
}
 
const connectedProjectPage = connect(mapStateToProps)(ProjectPage);
export { connectedProjectPage as ProjectPage };
