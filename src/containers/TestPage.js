import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
class TestPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {name: "Navi", cnt: 1};
    this.testClicked = this.testClicked.bind(this);
  }    

  componentDidMount() {
    const {dispatch} = this.props;

    //var user = JSON.parse(localStorage.getItem('user'));
         

  }

  testClicked() {
    console.log("-- testClicked --");
    var x = this.state.cnt + 1;
    this.setState({cnt: x});
    console.log("-- testClicked, cnt: " + this.state.cnt);
    

  }

  render() {
    // var  studies = JSON.parse(localStorage.getItem('studies'));
    console.log("props: " +this.props);

    setTimeout(this.testClicked, 1000); 

      return (
        <MuiThemeProvider>
          <div>
            <h2>name: {this.state.name}</h2>
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
 
const connectedTestPage = connect(mapStateToProps)(TestPage);
export { connectedTestPage as TestPage };
