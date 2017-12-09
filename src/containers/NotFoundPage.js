import React from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
class NotFoundPage extends React.Component {
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
          <div>
          <br />
          <center>
           <h2>Page not found!!!</h2>
          </center>
          <br />
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
 
const connectedNotFoundPage = connect(mapStateToProps)(NotFoundPage);
export { connectedNotFoundPage as NotFoundPage };
