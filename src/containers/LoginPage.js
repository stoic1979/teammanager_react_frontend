import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {connect} from 'react-redux';
import {userActions} from '../actions';

const styles = {  
  Container: {
      minWidth: 320,
      maxWidth: 400,
      height:'auto',
      position: 'absolute',
      left: 0,
      right: 0,
      margin: 'auto',
     },
  btn:{
    marginLeft : 20,
      },
  mybtn: {
      color: 'white'
     }
};

//---------------------------------------------------
//
//         LOGIN PAGE
//
//---------------------------------------------------
class LoginPage extends React.Component {

  // ------------------------------------------------
  // constructor
  // ------------------------------------------------
  constructor(props){
    super(props);

    this.state = {     
      email:'',
      password: '',
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleLogout = this.handleLogout.bind(this);
  }

  // ------------------------------------------------
  // handleChange
  // ------------------------------------------------
  handleChange(e) {
    console.log(`-- handleChange, target: ${e.target.name}`);

    const {name, value} = e.target;
    this.setState({[name]: value});
  }


  // ------------------------------------------------
  // handleLogOut
  // ------------------------------------------------
  // handleLogout(e) {

  //   console.log(`-- handleLogout ---`);

  //   e.preventDefault();

  //   const {dispatch} = this.props;
  //   var history = this.props.history;

  //   dispatch(userActions.logout(history));
  // }

  // ------------------------------------------------
  // handleSubmit
  // ------------------------------------------------
  handleSubmit(e) {
    e.preventDefault();

    console.log('-- handleSubmit --');

    this.setState({submitted: true});
    const {email, password} = this.state;
    const {dispatch} = this.props;

    if (email && password) {
      console.log('dispatching -> login');
      var history = this.props.history;
      dispatch(userActions.login(history, email, password));
    }
  }

render() {
  return (
    <div>
      <MuiThemeProvider>
        <form name="form" onSubmit={this.handleSubmit}> 
          <div style={styles.Container}>
          <h3>Log In</h3>
            <TextField
              hintText="Enter your Email"
              floatingLabelText="Email"
              name="email"
              onChange={this.handleChange} 
            />
            <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              name="password"
              onChange={this.handleChange} 
            />
            <br/>
            <RaisedButton label="Login" primary={true} type="submit"/>
          </div>
        </form>
      </MuiThemeProvider>
      </div>
    );
  }//render
}//LoginPage

function mapStateToProps(state) {
  const {alert} = state;
  return {
    alert,
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export {connectedLoginPage as LoginPage};