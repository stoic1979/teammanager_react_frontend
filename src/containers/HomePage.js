import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { connect } from 'react-redux';

const styles={
  main:{
    marginLeft:20,
  },
};

//---------------------------------------------------
//
//         HOME  PAGE
//
//---------------------------------------------------
class HomePage extends React.Component {
  render() {

    return (
        <MuiThemeProvider>
          <div style={styles.main}>HOME</div>
      </MuiThemeProvider>
      );
    }
  }

function mapStateToProps(state) {
  return state;
}
 
const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
