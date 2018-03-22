import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

const styles = {
  mybtn: {
      color: 'white'
     }
  };

class Loggedout extends React.Component {
  static muiName = 'FlatButton';
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <FlatButton  style={styles.mybtn}  label="Login" containerElement={<Link to="/login" />}/>
        <FlatButton   style={styles.mybtn} label="Regiter" containerElement={<Link to="/register" />}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {alert} = state;
  return {
    alert,
  };
}

const connectedLoggedout = connect(mapStateToProps)(Loggedout);
export {connectedLoggedout as Loggedout};
