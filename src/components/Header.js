import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Loggedin} from "./Loggedin"
import {Loggedout} from "./Loggedout"

import {connect} from 'react-redux';

import {literals} from "../config"


// -----------------------------------------------------------------------
//
//            HEADER COMPONENT
// 
// -----------------------------------------------------------------------
export default class Header extends React.Component {


  // ------------------------------------------------
  // render UI
  // ------------------------------------------------
  render() {
    const {loggedIn} = this.props;
    //console.log("Header got defs: " + defs.WEBSITE_TITLE );

    //const title = defs.WEBSITE_TITLE;
    const title = "ABC"

    return (
         <div>
            <MuiThemeProvider>
              <div>
                <AppBar
                  title={literals.WEBSITE_TITLE}
                  showMenuIconButton={true}
                  iconElementRight={loggedIn ? <Loggedin /> :  <Loggedout />}
                />

              </div>
            </MuiThemeProvider>
          </div>
      );
   }
}//Header


function mapStateToProps(state) {
  console.log("--- header got state: " + JSON.stringify(state));

  return state.authentication;
}

const connectedHeaderPage = connect(mapStateToProps)(Header);
export {connectedHeaderPage as Header};