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
  };


//---------------------------------------------------
//
//         REGISTER PAGE
//
//---------------------------------------------------

class RegisterPage extends React.Component {

  // ------------------------------------------------
  // constructor
  // ------------------------------------------------
constructor(props){
  super(props);

 this.state = {
            user: {
                id: '',
                name: '',
                email: '',
                password: ''
            },
            submitted: false
        };
 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  // ------------------------------------------------
  // handleChange
  // ------------------------------------------------
 
    handleChange(event) {
      console.log(`-- handleChange, target: ${event.target.name}`);
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

  // ------------------------------------------------
  // handleSubmit
  // ------------------------------------------------
 
    handleSubmit(event) {
        event.preventDefault();
       
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;

        if (user.id && user.name && user.email && user.password) {
          console.log('dispatching -> register');
          var history = this.props.history;
          dispatch(userActions.register(history, user));
        }
    }


render() {
    return (
      <div>
        <MuiThemeProvider>
          <div style={styles.Container}>
            <h3>Sign Up</h3>
              <form name="form" onSubmit={this.handleSubmit}> 
                <TextField
                  hintText="Enter your id"
                  floatingLabelText="User id"
                  name="id"
                  onChange = {this.handleChange}
                />
                <TextField
                  hintText="Enter your name"
                  floatingLabelText="User name"
                  name="name"
                  onChange = {this.handleChange}
                />
                <TextField
                  hintText="Enter your Email"
                  floatingLabelText="Email"
                  name="email"
                  onChange = {this.handleChange}
                />
                <br/>
                <TextField
                  type="password"
                  hintText="Enter your Password"
                  floatingLabelText="Password"
                  name="password"
                  onChange = {this.handleChange}
                />
                <br/>
                <RaisedButton label="Submit" primary={true}  type="submit"/>
              </form>
            </div>
         </MuiThemeProvider>
      </div>
    );
  } // render
}// Register Page


function mapStateToProps(state) {
  const {alert} = state;
  return {
    alert,
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export {connectedRegisterPage as RegisterPage};