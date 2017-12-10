import React from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



import {projectActions} from '../actions';

import {store} from '../store';
/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
class HomePage extends React.Component {
  constructor(props){
    super(props);
  }    


  componentDidMount() {
    const {dispatch} = this.props;

    //var user = JSON.parse(localStorage.getItem('user'));
    
        
  }

    render() {
     // var  studies = JSON.parse(localStorage.getItem('studies'));
     console.log("props: " +this.props);

      return (
        <MuiThemeProvider>
          <div>HOME</div>
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
 
const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
