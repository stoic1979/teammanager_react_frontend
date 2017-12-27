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
  btn:{
    marginLeft : 20,
      },
  mybtn: {
      color: 'white'
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
class CreateIssuePage extends React.Component {

  // ------------------------------------------------
  // constructor
  // ------------------------------------------------
  constructor(props){
    super(props);

    this.state = {     
      project:'',
      assignee:'',
      summary:'',
      description:'',
      type:'',
      priority:'',
      status:'',
      estimated_hours:'',
      start_date:'',
      end_date:'',
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
    const {project, assignee, summary, description, type, priority, status, estimated_hours, start_date, end_date, created_at, updated_at } = this.state;
    var  issue_data={project, assignee, summary, description, type, priority,  status, estimated_hours, start_date, end_date, created_at, updated_at};
    const {dispatch} = this.props;
    console.log("issue_data" +JSON.stringify(issue_data));

    if (project && assignee && summary && description && type && priority && status && estimated_hours && start_date && end_date  ) {
      console.log('dispatching -> create issue');
      // var history = this.props.history;
      dispatch(issueActions.create( issue_data));
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

  if (this.props.projects) {
      for (var i = this.props.selectedProject; i <=this.props.projects[i]; i++) {
        console.log(`projects ${  i + 1  }:${  JSON.stringify(this.props.projects[i])}`);
        var pro = this.props.projects[i];
        var proj=pro.title;
        console.log("project name" +proj);
      }
    }

  const {project, assignee, summary, description, type, priority, status, estimated_hours, start_date, end_date, created_at, updated_at} = this.state;
  return (
    <div>
      <MuiThemeProvider>
        <form name="form" onSubmit={this.handleSubmit}> 
          <div style={styles.Container}>
          <h3>Create Issue</h3>
          <Container>
          <Row>
          <Col sm={6}>
            <TextField
              hintText="Project "
              floatingLabelText="Project "
              name="project"
              value={project}
              onChange={this.handleChange} 
            />
            <br/>
            <TextField
              hintText="Assignee"
              floatingLabelText="Assignee"
              name="assignee"
              value={assignee}
              onChange={this.handleChange} 
            />
            <TextField
              hintText="Summary"
              floatingLabelText="Summary"
              name="summary"
              value={summary}
              onChange={this.handleChange} 
            />
            <TextField
              hintText="Description"
              floatingLabelText="Description"
              name="description"
              value={description}
              onChange={this.handleChange} 
            />
            <TextField
              hintText="Type"
              floatingLabelText="Type"
              name="type"
              value={type}
              onChange={this.handleChange} 
            />
            <TextField
              hintText="Priority"
              floatingLabelText="Priority"
              name="priority"
              value={priority}
              onChange={this.handleChange} 
            />
            </Col>
            <Col sm={6}>
            <TextField
              hintText="Status"
              floatingLabelText="Status"
              name="status"
              value={status}
              onChange={this.handleChange} 
            />
            <TextField
              hintText="Estimated hours"
              floatingLabelText="Estimated hours"
              name="estimated_hours"
              value={estimated_hours}
              onChange={this.handleChange} 
            />
            <TextField
              hintText="Start Date"
              floatingLabelText="Start Date"
              name="start_date"
              value={start_date}
              onChange={this.handleChange} 
            />
            <TextField
              hintText="End Date"
              floatingLabelText="End Date"
              name="end_date"
              value={end_date}
              onChange={this.handleChange} 
            />
            <TextField
              hintText="Created at"
              floatingLabelText="Created At"
              name="created_at"
              value={created_at}
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

const connectedCreateIssuePage = connect(mapStateToProps)(CreateIssuePage);
export {connectedCreateIssuePage as CreateIssuePage};