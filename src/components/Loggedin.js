import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import {connect} from 'react-redux';
import { Link } from 'react-router-dom';


const styles = {
  mybtn: {
      color: 'white'
     }
  };

class Loggedin extends React.Component {
  static muiName = 'FlatButton';

    // ------------------------------------------------
    // render UI
    // ------------------------------------------------

    render() {
    return (
      <div>
        <FlatButton style={styles.mybtn} label="HOME" containerElement={<Link to="/" />}  />
        <FlatButton style={styles.mybtn} label="PROJECTS"  containerElement={<Link to="/projectList" />}/>
        <FlatButton style={styles.mybtn} label="ISSUES"  containerElement={<Link to="/issueList" />}/>
        <FlatButton style={styles.mybtn} label="TEAM"  containerElement={<Link to="/teamMemberList" />}/>
        <FlatButton style={styles.mybtn} label="LOGOUT" containerElement={<Link to="/logout" />}/>
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

const connectedLoggedin = connect(mapStateToProps)(Loggedin);
export {connectedLoggedin as Loggedin};
