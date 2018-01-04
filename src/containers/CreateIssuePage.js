import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Container,Col,Row} from 'react-grid-system';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import selectedProjectreducer from '../reducers'
import {connect} from 'react-redux';
import {issueActions} from '../actions';
import {projectActions} from '../actions';

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
    this.handleChange   = this.handleChange.bind(this);
    this.handleSubmit   = this.handleSubmit.bind(this);
    this.handleType     = this.handleType.bind(this);
    this.handleStatus   = this.handleStatus.bind(this);
    this.handlePriority = this.handlePriority.bind(this);
    
  }


componentDidMount() {

  const {dispatch} = this.props;
    
  var resp = dispatch(projectActions.getAll());

  

  }
  // handle select field value
 handleType = (event, index, value) => this.setState({type:value});

 handleStatus = (event, index, value) => this.setState({status:value});

 handlePriority = (event, index, value) => this.setState({priority:value});
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
    console.log("submit state---------------" +JSON.stringify(this.state));
    console.log('-- create issue handleSubmit --');

    this.setState({submitted: true});
    console.log(this.state);
    const {project, summary, description, type, priority, status, estimated_hours, start_date, end_date, created_at, updated_at } = this.state;
    var  issue_data={project, summary, description, type, priority,  status, estimated_hours, start_date, end_date, created_at, updated_at};
    const {dispatch} = this.props;
    console.log("issue_data" +JSON.stringify(issue_data));

    if (  summary && description && type && priority && status && estimated_hours && start_date && end_date  ) {
      console.log('dispatching -> create issue');
      // var history = this.props.history;
      dispatch(issueActions.create( issue_data));
    }
  }
  
render() {
 
    // this.setState({project: id});
    
    var key = JSON.parse(localStorage.getItem('project_id'));

    if (this.props.projects) {
      for (var i = 0; i < this.props.projects.length; i++) {
        console.log(`projects ${  i + 1  }:${  JSON.stringify(this.props.projects[i])}`);
        if(i==key){
        var pro = this.props.projects[i];

        var project=pro._id;
        var project_name=pro.title;
       
        console.log("selected Project id-------->> "+project);
        console.log("selected Project name-------->> "+project_name);
      }
        
      }

    }
  const { summary, description, type, priority, status, estimated_hours, start_date, end_date, created_at, updated_at} = this.state;
  return (
    <div>
      <MuiThemeProvider>
        <form name="form" onSubmit={this.handleSubmit}> 
          <div style={styles.Container}>
          <h3>Add Issue to {project_name}</h3>
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
            <TextField
              hintText="Start Date"
              floatingLabelText="Start Date"
              name="start_date"
              value={start_date}
              onChange={this.handleChange} 
            />
            </Col>
            <Col sm={6}>
            <TextField
              hintText="Description"
              floatingLabelText="Description"
              name="description"
              value={description}
              onChange={this.handleChange} 
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
              <MenuItem value={"BLOCKER"} primaryText="Not-Started" />
              <MenuItem value={"HIGH"} primaryText="Working " />
              <MenuItem value={"MEDIUM"} primaryText="Testing" />
              <MenuItem value={"LOW"} primaryText="Closed " />
            </SelectField>
            <TextField
              hintText="End Date"
              floatingLabelText="End Date"
              name="end_date"
              value={end_date}
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
  // console.log("create issue got state" + JSON.stringify(state));
  console.log("create issue got projects" + JSON.stringify(state.projects));
  
    return {
    projects: state.projects,
   selectedProject: state.selectedProject
  

  };

}

const connectedCreateIssuePage = connect(mapStateToProps)(CreateIssuePage);
export {connectedCreateIssuePage as CreateIssuePage};