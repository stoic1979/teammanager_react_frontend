import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles={
  main:{
    marginLeft:20,
  },
};

//---------------------------------------------------
//
//         ABOUT US PAGE
//
//---------------------------------------------------

class AboutUsPage extends React.Component {
  render() {

    return (
        <MuiThemeProvider>
          <div style={styles.main}>ABOUT US</div>
      </MuiThemeProvider>
      );
    }
  }

function mapStateToProps(state) {
  return state;
}

const connectedAboutUsPage = connect(mapStateToProps)(AboutUsPage);
export { connectedAboutUsPage as AboutUsPage };
