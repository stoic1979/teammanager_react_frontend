import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
class ProjectListPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {name: "Navi", cnt: 1};
  }    

  componentDidMount() {
    const {dispatch} = this.props;

    //var user = JSON.parse(localStorage.getItem('user'));
         
  }

  testClicked() {

  }

  render() {
    // var  studies = JSON.parse(localStorage.getItem('studies'));
    console.log("props: " +this.props);

      return (
        <MuiThemeProvider>
          <div>
            <h2>Projects for {this.state.name}</h2>
            Cnt: {this.state.cnt}
            <RaisedButton label="Test" primary={true} onClick={this.testClicked}/>
          </div>
      </MuiThemeProvider>
      );
    }
  }

function mapStateToProps(state) {
  return state;

  //return {
    //studies: state.studies
  //};
}
 
const connectedProjectListPage = connect(mapStateToProps)(ProjectListPage);
export { connectedProjectListPage as ProjectListPage };
