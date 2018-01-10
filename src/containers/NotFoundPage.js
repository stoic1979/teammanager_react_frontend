import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { connect } from 'react-redux';


//---------------------------------------------------
//
//         NOT FOUND PAGE
//
//---------------------------------------------------

class NotFoundPage extends React.Component {
  
  render() {
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
}//NotFoundPage


function mapStateToProps(state) {
  return state;
  }
 
const connectedNotFoundPage = connect(mapStateToProps)(NotFoundPage);
export { connectedNotFoundPage as NotFoundPage };
