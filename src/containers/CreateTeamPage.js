import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Container,Col,Row} from 'react-grid-system';
import selectedProjectreducer from '../reducers'
import {connect} from 'react-redux';
import {issueActions} from '../actions';
const styles = {  
  Container: {
      minWidth: 320,
      maxWidth: 800,
      height:'auto',
      position: 'absolute',
      left: 0,
      right: 0,
      margin: 'auto',
      marginBottom:40,
     },
  sbt:{
      marginLeft:'40%',
    },
  };

//---------------------------------------------------
//
//         CREATE ISSUE PAGE
//
//---------------------------------------------------
class CreateTeamPage extends React.Component {

  // ------------------------------------------------
  // constructor
  // ------------------------------------------------
  constructor(props){
    super(props);

    this.state = {     
      name:'',
      manager:'',
      members:'',
      created_at:'',
      updated_at:'',
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
    console.log(this.state);
    console.log('-- create issue handleSubmit --');

    this.setState({submitted: true});
    console.log(this.state);
    const {name, manager, members, created_at, updated_at } = this.state;
    var  team_data={name, manager, members, created_at, updated_at};
    const {dispatch} = this.props;
    console.log("team_data" +JSON.stringify(team_data));

    if (name && manager && members && created_at && updated_at) {
      console.log('dispatching -> create team');
      // var history = this.props.history;
      // dispatch(issueActions.create( issue_data));
    }
  }
  //--------------------------------------------------
  //componentDidMount
  //--------------------------------------------------
    componentDidMount(){
      // this.setState({project_id:localStorage.getItem('project_id')});
      this.setState({assignee:localStorage.getItem('user.username')});
      // localStorage.setItem('project_id','');
    }
render() {

  

  const {name, manager, members, created_at, updated_at} = this.state;
  return (
    <div>
      <MuiThemeProvider>
        <form name="form" onSubmit={this.handleSubmit}> 
          <div style={styles.Container}>
            <h3>Create Team</h3>
            <Container>
              <Row>
                <Col sm={6}>
                  <TextField
                    hintText="Name"
                    floatingLabelText="Name "
                    name="name"
                    value={name}
                    onChange={this.handleChange} 
                  />
                  <TextField
                    hintText="Members"
                    floatingLabelText="Members "
                    name="members"
                    value={members}
                    onChange={this.handleChange} 
                  />
                  <TextField
                    hintText="Updated at"
                    floatingLabelText="Updated At"
                    name="updated_at"
                    value={updated_at}
                    onChange={this.handleChange} 
                  />
                </Col>
                <Col sm={6}>
                  <TextField
                    hintText="Manager"
                    floatingLabelText="Manager"
                    name="manager"
                    value={manager}
                    onChange={this.handleChange} 
                  />
                  <TextField
                    hintText="Created at"
                    floatingLabelText="Created At"
                    name="created_at"
                    value={created_at}
                    onChange={this.handleChange} 
                  />
                </Col>
              </Row>
            </Container>
            <br/>
            <RaisedButton style={styles.sbt} label="Submit" primary={true} type="submit"/>
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

const connectedCreateTeamPage = connect(mapStateToProps)(CreateTeamPage);
export {connectedCreateTeamPage as CreateTeamPage};