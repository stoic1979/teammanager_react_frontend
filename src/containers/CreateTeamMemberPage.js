import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {connect} from 'react-redux';
import {teamMemberActions} from '../actions';

const styles = {  
  Container: {
      minWidth: 350,
      maxWidth: 550,
      height:'auto',
      position: 'absolute',
      left: 0,
      right: 0,
      margin: 'auto',
      marginBottom:40,
     },
  sbt:{
      marginLeft:'10%',
    },
  };

//---------------------------------------------------
//
//         CREATE TEAM MEMBER PAGE
//
//---------------------------------------------------
class CreateTeamMemberPage extends React.Component {

  // ------------------------------------------------
  // constructor
  // ------------------------------------------------
  constructor(props){
    super(props);

    this.state = {     
      email:'',
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
  // handleSubmit
  // ------------------------------------------------
  handleSubmit(e) {
    e.preventDefault();
   
    console.log('-- create team member handleSubmit --');

    this.setState({submitted: true});
    console.log(this.state);
    const {email} = this.state;
   
    const {dispatch} = this.props;
    
    if (email) {
      console.log('dispatching -> create team member');
      // var history = this.props.history;
      dispatch(teamMemberActions.create(email));
    }
  }
  
render() {
  const {email} = this.state;
  return (
    <div>
      <MuiThemeProvider>
        {this.props.alert.message}
        <form name="form" onSubmit={this.handleSubmit}> 
          <div style={styles.Container}>
            <h3>Invite Team Member</h3>
              <TextField
                hintText="Email"
                floatingLabelText="Enter Email"
                name="email"
                value={email}
                onChange={this.handleChange} 
              />
              <br/><br/>
            <RaisedButton style={styles.sbt} label="Invite" primary={true} type="submit"/>
          </div>
        </form>
      </MuiThemeProvider>
    </div>
    );
  }//render
}//LoginPage

function mapStateToProps(state) {
  const {alert} = state;
  // console.log("create team got state" + JSON.stringify(state));
  return {
    alert,
    projects: state.projects,
    selectedProject: state.selectedProject
  };
}

const connectedCreateTeamMemberPage = connect(mapStateToProps)(CreateTeamMemberPage);
export {connectedCreateTeamMemberPage as CreateTeamMemberPage};