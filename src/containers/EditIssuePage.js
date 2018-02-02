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
//         EDIT ISSUE PAGE
//
//---------------------------------------------------
class EditIssuePage extends React.Component {

  // ------------------------------------------------
  // constructor
  // ------------------------------------------------
  constructor(props){
    super(props);

    this.state = {    
      id :'', 
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

    if(localStorage.getItem('issue_id')){
      var issue_id = localStorage.getItem('issue_id');
      console.log(' [componentDidMount] issue_id '+issue_id);
    }  

    const {dispatch} = this.props;
    dispatch(issueActions.getById(issue_id));
    dispatch(projectActions.getAll());
    dispatch(userActions.getAll());
  }

   componentWillReceiveProps(nextProps) {
    
    if(nextProps.selectedIssue_data){
      var iss_id = nextProps.selectedIssue_data._id;
      var iss_summ = nextProps.selectedIssue_data.summary;
      var iss_desc = nextProps.selectedIssue_data.description;
      var iss_pro = nextProps.selectedIssue_data.project;
      var iss_ass = nextProps.selectedIssue_data.assignee;
      var est_hours = nextProps.selectedIssue_data.estimated_hours;
      var iss_type = nextProps.selectedIssue_data.type;
      var iss_stts = nextProps.selectedIssue_data.status;
      var iss_prio = nextProps.selectedIssue_data.priority;
      var s_date = nextProps.selectedIssue_data.start_date;
      var e_date = nextProps.selectedIssue_data.end_date;

      var st_date = new Date(s_date);
      var ed_date = new Date(e_date)
      this.setState({id: iss_id, summary:iss_summ, description:iss_desc, project:iss_pro, assignee:iss_ass, estimated_hours:est_hours, type:iss_type, status:iss_stts, priority:iss_prio, start_date: st_date, end_date:ed_date});
      // console.log('[ componentWillReceiveProps] '+JSON.stringify(nextProps.selectedProject_data));
      // console.log('[ componentWillReceiveProps date] '+JSON.stringify(s_date));
    }
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
     
    e.preventDefault();
    console.log("submit state---------------" +JSON.stringify(this.state));
    console.log('-- create issue handleSubmit --');

    this.setState({submitted: true});
    console.log(this.state);
    const {id,assignee, project, summary, description, type, priority, status, estimated_hours, start_date, end_date, created_at, updated_at } = this.state;
    var  issue_data={id, assignee, project, summary, description, type, priority,  status, estimated_hours, start_date, end_date, created_at, updated_at};
    const {dispatch} = this.props;
    console.log("issue_data" +JSON.stringify(issue_data));

    if (summary && description && type && priority && status && estimated_hours && start_date && end_date  ) {
      console.log('dispatching -> create issue');
      // var history = this.props.history;
      dispatch(issueActions.edit( issue_data));

      // this.props.history.push('/issueList');
    }
  }
  
render() {
  // console.log('selectedIssue '+this.props.selectedIssue.issue);
  if (this.props.selectedProject) {
      for (var i = 0; i < this.props.selectedProject.length; i++) {
        // console.log(`selectedProject ${  i + 1  }:${  JSON.stringify(this.props.selectedProject[i])}`);
        var pro = this.props.selectedProject[i];
        console.log('id++ '+JSON.stringify(pro.project._id));
       
       }
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
            <h3>Edit Issue </h3>
            <Container>
              <Row>
                <Col sm={6}>
                  <SelectField
                    floatingLabelText="Project "
                    name="project"
                    value={this.state.project}
                    onChange={this.handleProject}
                    style={styles.customWidth}
                  >
                    {item}
                  </SelectField>
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
  console.log("edit issue got state" + JSON.stringify(state.issues.issue));
  return {
    alert,
    projects: state.projects.projects,
    latest_project: state.projects.latest_project,
    selectedProject: state.selectedProject,
    selectedIssue: state.selectedIssue,
    selectedIssue_data: state.issues.issue,
    users: state.users
  };
}

const connectedEditIssuePage = connect(mapStateToProps)(EditIssuePage);
export {connectedEditIssuePage as EditIssuePage};