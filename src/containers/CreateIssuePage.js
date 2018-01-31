import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Container,Col,Row} from 'react-grid-system';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';


import {connect} from 'react-redux';
import {issueActions} from '../actions';
import {projectActions} from '../actions';
import {userActions} from '../actions';

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
  customWidth: {
    width: 250,
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
    this.handleChange    = this.handleChange.bind(this);
    this.handleSubmit    = this.handleSubmit.bind(this);
    this.handleType      = this.handleType.bind(this);
    this.handleStatus    = this.handleStatus.bind(this);
    this.handlePriority  = this.handlePriority.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleAssignee  = this.handleAssignee.bind(this);
    this.handleProject   = this.handleProject.bind(this);
    
  }

  componentDidMount() {

    const {dispatch} = this.props;
    dispatch(projectActions.getAll());
    dispatch(userActions.getAll());
  }

  // ------------------------------------------------------------
  // handle select field value
  // -------------------------------------------------------------

 handleType = (event, index, value) => this.setState({type:value});

 handleStatus = (event, index, value) => this.setState({status:value});

 handlePriority = (event, index, value) => this.setState({priority:value});

 handleAssignee = (event, index, value) => this.setState({assignee:value});

 handleProject = (event, index, value) => this.setState({project:value});

  // ------------------------------------------------
  // handleChange
  // ------------------------------------------------

  handleChange(e) {
    console.log(`-- handleChange, target: ${e.target.name}`);
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  // ------------------------------------------------
  // handle start date value
  // ------------------------------------------------

 handleStartDate = (event, date) => {
    this.setState({
      start_date: date,
    });
  };

  // -----------------------------------------------
  // handle start date value
  // -----------------------------------------------

 handleEndDate = (event, date) => {
    this.setState({
      end_date: date,
    });
  };

  // ------------------------------------------------
  // handleSubmit
  // ------------------------------------------------

  handleSubmit(e) {
    
    if (this.props.selectedProject) {
     var project = this.props.selectedProject._id;
      console.log('[handleSubmit] selectedProject id++ '+project);
    }
    else if (localStorage.getItem('project_id')){
      var project = localStorage.getItem('project_id');
      console.log('[handleSubmit] localStorage  id++ '+project);
    }
    else if(this.props.latest_project){
      var project = this.props.latest_project._id;
      console.log('[handleSubmit] latest_project id++ '+project);
    }
    e.preventDefault();
    console.log("submit state---------------" +JSON.stringify(this.state));
    console.log('-- create issue handleSubmit --');

    this.setState({submitted: true});
    console.log(this.state);
    const {assignee, summary, description, type, priority, status, estimated_hours, start_date, end_date, created_at, updated_at } = this.state;
    var  issue_data={assignee, project, summary, description, type, priority,  status, estimated_hours, start_date, end_date, created_at, updated_at};
    const {dispatch} = this.props;
    console.log("issue_data" +JSON.stringify(issue_data));

    if (  summary && description && type && priority && status && estimated_hours && start_date && end_date  ) {
      console.log('dispatching -> create issue');
      // var history = this.props.history;
      dispatch(issueActions.create( issue_data));

      this.props.history.push('/issueList');
    }
  }
  
render() {
  
  var current_project_title;
  if (this.props.selectedProject) {
    console.log(' [render] selectedProject '+this.props.selectedProject.title);
    current_project_title = this.props.selectedProject.title;   
  }
  else if(localStorage.getItem('project_title')){
    console.log(' [render] localStorage project '+localStorage.getItem('project_title'));
    current_project_title = localStorage.getItem('project_title');
  }
  else if(this.props.latest_project){
    console.log(' [render] latest_project '+this.props.latest_project.title);
    current_project_title = this.props.latest_project.title;
  }
  
  var item=[];
    if (this.props.projects) {
      for (var i = 0; i < this.props.projects.length; i++) {
        // console.log(`projects ${  i + 1  }:${  JSON.stringify(this.props.projects[i])}`);
        var pro = this.props.projects[i];
        item.push(
          <MenuItem value={pro._id} primaryText={pro.title} />
          );
       }
    }

    var Items=[];
    if(this.props.users){
      for(i=0;i<this.props.users.length;i++){
        // console.log(`users ${  i + 1  }:${  JSON.stringify(this.props.users[i])}`);
        var user=this.props.users[i];
        Items.push(
          <MenuItem value={user._id} primaryText={user.first_name +" "+ user.last_name} />
        );
      }
    }
  const {assignee, project, summary, description, type, priority, status, estimated_hours, start_date, end_date, created_at, updated_at} = this.state;
  return (
    <div>
      <MuiThemeProvider>
        {this.props.alert.message}
        <form name="form" onSubmit={this.handleSubmit}> 
          <div style={styles.Container}>
            <h3>Add Issue to {current_project_title }</h3>
            <Container>
              <Row>
                <Col sm={6}>
                  <TextField
                    hintText="Summary"
                    floatingLabelText="Summary"
                    name="summary"
                    value={summary}
                    onChange={this.handleChange} 
                  />
                  <TextField
                    hintText="Estimated hours"
                    floatingLabelText="Estimated hours"
                    name="estimated_hours"
                    value={estimated_hours}
                    onChange={this.handleChange} 
                  />
                  <SelectField
                    floatingLabelText="Type "
                    name="type"
                    value={this.state.type}
                    onChange={this.handleType}
                    style={styles.customWidth}
                  >
                    <MenuItem value={"TASK"} primaryText="Task" />
                    <MenuItem value={"BUG"} primaryText="Bug " />
                    <MenuItem value={"ENHANCEMENT"} primaryText="Enhancement" />
                  </SelectField>
                   <DatePicker
                    floatingLabelText="Start Date"
                    hintText="Start Date"
                    value={this.state.start_date}
                    onChange={this.handleStartDate}
                  />
                   <SelectField
                    floatingLabelText="Status "
                    name="status"
                    value={this.state.status}
                    onChange={this.handleStatus}
                    style={styles.customWidth}
                  >
                    <MenuItem value={"NOT-STARTED"} primaryText="Not-Started" />
                    <MenuItem value={"WORKING"} primaryText="Working " />
                    <MenuItem value={"TESTING"} primaryText="Testing" />
                    <MenuItem value={"CLOSED"} primaryText="Closed " />
                    <MenuItem value={"REOPENED"} primaryText="Reopened" />
                  </SelectField>
                </Col>
                <Col sm={6}>
                  <SelectField
                    floatingLabelText="Assignee "
                    name="assignee"
                    value={this.state.assignee}
                    onChange={this.handleAssignee}
                    style={styles.customWidth}
                  >
                  {Items}
                  </SelectField>
                  <TextField
                    hintText="Description"
                    floatingLabelText="Description"
                    name="description"
                    value={description}
                    onChange={this.handleChange} 
                    multiLine={true}
                    rows={2}
                  />
                  <SelectField
                    floatingLabelText="Priority "
                    name="priority"
                    value={this.state.priority}
                    onChange={this.handlePriority}
                    style={styles.customWidth}
                  >
                    <MenuItem value={"BLOCKER"} primaryText="Blocker" />
                    <MenuItem value={"HIGH"} primaryText="High" />
                    <MenuItem value={"MEDIUM"} primaryText="Medium" />
                    <MenuItem value={"LOW"} primaryText="Low" />
                  </SelectField>
                  <DatePicker
                    floatingLabelText="End Date"
                    hintText="End Date"
                    value={this.state.end_date}
                    onChange={this.handleEndDate}
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
  const {alert} = state;
  // console.log("create issue got state" + JSON.stringify(state));
  return {
    alert,
    projects: state.projects.projects,
    latest_project: state.projects.latest_project,
    selectedProject: state.selectedProject,
    users: state.users
  };
}

const connectedCreateIssuePage = connect(mapStateToProps)(CreateIssuePage);
export {connectedCreateIssuePage as CreateIssuePage};