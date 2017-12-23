import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import selectedProjectreducer from '../reducers'
import {connect} from 'react-redux';
import {projectActions} from '../actions';
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
//         CREATE ISSUE PAGE
//
//---------------------------------------------------
class CreateIssuePage extends React.Component {

  // ------------------------------------------------
  // constructor
  // ------------------------------------------------
  constructor(props){
    super(props);

    this.state = {     
      project_id:'',
      created_at:'',
      updated_at:'',
      title:'',
      manager:'',
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
    console.log('-- create project handleSubmit --');

    this.setState({submitted: true});
    console.log(this.state);
    const {project_id, created_at, updated_at, title, manager } = this.state;
    var  project_data={project_id, created_at, updated_at, title, manager };
    const {dispatch} = this.props;
    console.log("project_data" +JSON.stringify(project_data));

    if (project_id && created_at && updated_at && title && manager ) {
      console.log('dispatching -> create issue');
      // var history = this.props.history;
      dispatch(projectActions.create( project_data));
    }
  }
  //--------------------------------------------------
  //componentDidMount
  //--------------------------------------------------
    componentDidMount(){
      this.setState({project_id:localStorage.getItem('project_id')});
      localStorage.setItem('project_id','');
    }
render() {
  const {project_id,  created_at, updated_at, title, manager} = this.state;
  return (
    <div>
      <MuiThemeProvider>
        <form name="form" onSubmit={this.handleSubmit}> 
          <div style={styles.Container}>
          <h3>Create Issue</h3>
            <TextField
              hintText="Project id"
              floatingLabelText="Project id"
              name="project_id"
              value={project_id}
              onChange={this.handleChange} 
            />
            <br/>
            <TextField
              hintText="Project Creation Date"
              floatingLabelText="Created At"
              name="created_at"
              value={created_at}
              onChange={this.handleChange} 
            />
            <TextField
              hintText="Updated At"
              floatingLabelText="Updated At"
              name="updated_at"
              value={updated_at}
              onChange={this.handleChange} 
            />
            <TextField
              hintText="Title"
              floatingLabelText="Title"
              name="title"
              value={title}
              onChange={this.handleChange} 
            />
             <TextField
              hintText="Manager"
              floatingLabelText="Manager"
              name="manager"
              value={manager}
              onChange={this.handleChange} 
            />
            <br/>
            <RaisedButton label="Submit" primary={true} type="submit"/>
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

const connectedCreateIssuePage = connect(mapStateToProps)(CreateIssuePage);
export {connectedCreateIssuePage as CreateIssuePage};