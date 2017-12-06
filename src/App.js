import React, { Component } from 'react';
import './App.css';
import {Header} from "./components/Header"
import {Routes} from './routes'

import {connect} from 'react-redux';


// -----------------------------------------------------------------------
//
//            APP
// 
// -----------------------------------------------------------------------
class App extends Component {

    // ------------------------------------------------
    // render UI
    // ------------------------------------------------
    render() {
      return (
         <div>
            <Header />
            <hr />
            <Routes/>
          </div>

      );//return

    }//render

}//App

function mapStateToProps(state) {
  const {alert} = state;
  return {
    alert,
  };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};