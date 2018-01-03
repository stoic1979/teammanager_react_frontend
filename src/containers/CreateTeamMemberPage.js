import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Container,Col,Row} from 'react-grid-system';
import selectedProjectreducer from '../reducers'
import {connect} from 'react-redux';
import {teamMemberActions} from '../actions';
const styles = {  
  Container: {
      minWidth: 350,
      maxWidth: 400,
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
//         CREATE ISSUE PAGE
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
      var history = this.props.history;
      dispatch(teamMemberActions.create(email));
    }
  }
  
render() {

  

  const {email} = this.state;
  return (
    <div>
      <MuiThemeProvider>
        <form name="form" onSubmit={this.handleSubmit}> 
          <div style={styles.Container}>
            <h3>Invite Team Member</h3>
            <Container>
              <Row>
                <Col sm={6}>
                  <TextField
                    hintText="Email"
                    floatingLabelText="Enter Email"
                    name="email"
                    value={email}
                    onChange={this.handleChange} 
                  />
                  
                </Col>
              </Row>
            </Container>
            <br/>
            <RaisedButton style={styles.sbt} label="Invite" primary={true} type="submit"/>
          </div>
        </form>
      </MuiThemeProvider>
    </div>
    );
  }//render
}//LoginPage

function mapStateToProps(state) {
  // const {alert} = state;
  console.log("create issue got state" + JSON.stringify(state));
  
    return {
    projects: state.projects,
   selectedProject: state.selectedProject
  

  };

}

const connectedCreateTeamMemberPage = connect(mapStateToProps)(CreateTeamMemberPage);
export {connectedCreateTeamMemberPage as CreateTeamMemberPage};