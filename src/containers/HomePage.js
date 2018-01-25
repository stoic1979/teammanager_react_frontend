import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';

import {Container,Col,Row} from 'react-grid-system';
import { connect } from 'react-redux';

const styles={
  text:{
    style: "normal",
    margin : 20,
  },
  btn:{
    marginRight: 20,
  },
  paper:{
    height: 400,
    width: 800,
    marginTop: "50px",
    marginLeft: "250px",
    textAlign: 'center',
    display: 'inline-block',
  },
  // appbar:{
  //   backgroundColor:"#87cefa"
  // }
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
          <div>
            <Paper style={styles.paper}>
              <AppBar
                style={styles.appbar}
                title="TEAM MANAGER"
                showMenuIconButton={false}
              />
              <Container>
                <Row>
                  <Col>
                    <img src ={require("../imgs/conference.png")}/>
                  </Col>
                  <Col>
                    <div style={styles.text}>
                      Accelerate your team's performance by assigning tasks, communicating and
                      tracking progress in one place. Use the Team manager project to stay on 
                      top of your work.It gives a one-stop solution that encompasses many of 
                      our project management needs as a result, the team is more efficient and
                      therefore more effective.
                      <br/>
                      <p>
                        Signup with team manager to build up your team and have a successful business! 
                        <br/><br/>
                        <RaisedButton href="login" label="Login" style={styles.btn} primary={true}></RaisedButton> 
                        <RaisedButton href="register" label="Sign Up ?" primary={true}></RaisedButton>
                      </p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Paper>
          </div>
      </MuiThemeProvider>
      );
    }
  }

function mapStateToProps(state) {
  return state;
}
 
const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
