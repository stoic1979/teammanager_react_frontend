import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Container,Col,Row} from 'react-grid-system';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {connect} from 'react-redux';
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
  sbt:{
      marginLeft:'40%',
   },
 };

//---------------------------------------------------
//
//         CREATE PROJECT PAGE
//
//---------------------------------------------------
class EditProjectPage extends React.Component {

  // ------------------------------------------------
  // constructor
  // ------------------------------------------------
  constructor(props){
    super(props);

    this.state = { 
      id              :'',    
      description     : '',
      title           : '',
      assignee        : '',
      estimated_hours : '',
      start_date      : '',
      end_date        : '',

      submitted: false
    }

    this.handleChange   = this.handleChange.bind(this);
    this.handleSubmit   = this.handleSubmit.bind(this);
    this.handleAssignee = this.handleAssignee.bind(this);
  }

  componentDidMount() {

    if(localStorage.getItem('project_id')){
      var project_id = localStorage.getItem('project_id');
      console.log(' [componentDidMount] project_id '+project_id);
    }

    const {dispatch} = this.props;
    dispatch(userActions.getAll());
    dispatch(projectActions.getById(project_id));
  }

  componentWillReceiveProps(nextProps) {
    
    if(nextProps.selectedProject_data){
      var pro_id = nextProps.selectedProject_data._id;
      var pro_title = nextProps.selectedProject_data.title;
      var pro_desc = nextProps.selectedProject_data.title;
      var pro_assignee = nextProps.selectedProject_data.assignee;
      var est_hours = nextProps.selectedProject_data.estimated_hours;
      var s_date = nextProps.selectedProject_data.start_date;
      var st_date = new Date(s_date);
      var e_date = nextProps.selectedProject_data.end_date;
      var ed_date = new Date(e_date)
      this.setState({id: pro_id, title:pro_title, description:pro_desc, assignee:pro_assignee, estimated_hours:est_hours, start_date: st_date, end_date:ed_date});
      console.log('[ componentWillReceiveProps] '+JSON.stringify(nextProps.selectedProject_data));
      console.log('[ componentWillReceiveProps date] '+JSON.stringify(s_date));
    }
  }
  // ----------------------------------------------
  // handle select field  value of assignee
  // ----------------------------------------------

  handleAssignee = (event, index, value) => this.setState({assignee:value});

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
    console.log('-- create project handleSubmit --');

    this.setState({submitted: true});
    const {id, description, title, assignee, estimated_hours, start_date, end_date} = this.state;
    var  project_data={id, description, title, assignee, estimated_hours, start_date, end_date };
    const {dispatch} = this.props;
    console.log("project_data" +JSON.stringify(project_data));

    if (description && title  ) {
      console.log('dispatching -> create project');
      // var history = this.props.history;
      dispatch(projectActions.edit( project_data));

      // this.props.history.push('/projectList');
    }
  }

render() {
  var Items=[];
    if(this.props.users){
      for(var i=0;i<this.props.users.length;i++){
        // console.log(`users ${  i + 1  }:${  JSON.stringify(this.props.users[i])}`);
        var user=this.props.users[i];
        Items.push(
          <MenuItem value={user._id} primaryText={user.first_name +" "+ user.last_name} />
          );
        }
      }
  const {description, title, assignee, estimated_hours, start_date, end_date} = this.state;
  return (
    <div>
      <MuiThemeProvider>
        <center>{this.props.alert.message}</center>
        <form name="form" onSubmit={this.handleSubmit}> 
          <div style={styles.Container}>
            <h3>Edit Project</h3>
            <Container>
              <Row>
                <Col sm={6}>
                  <TextField
                    floatingLabelText="Title "
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange} 
                  />
                  <SelectField
                    floatingLabelText="Assignee "
                    name="assignee"
                    value={this.state.assignee}
                    onChange={this.handleAssignee}
                    style={styles.customWidth}
                  >
                  {Items}
                  </SelectField>
                  <DatePicker
                    floatingLabelText="Start Date"
                    value={this.state.start_date}
                    onChange={this.handleStartDate}
                  />
                  <br/>
                </Col>
                <Col sm={6}>
                  <TextField
                    hintText="Description"
                    floatingLabelText="Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange} 
                    multiLine={true}
                    rows={2}
                  />
                  <TextField
                    hintText="Estimated hours"
                    floatingLabelText="Estimated hours"
                    name="estimated_hours"
                    value={this.state.estimated_hours}
                    onChange={this.handleChange} 
                  />
                  <DatePicker
                    floatingLabelText="End Date"
                    value={this.state.end_date}
                    onChange={this.handleEndDate}
                  />
                </Col>
              </Row>
            </Container>
            <br/><br/>
            <RaisedButton style={styles.sbt} label="Submit" primary={true} type="submit"/>
          </div>
        </form>
      </MuiThemeProvider>
    </div>
    );
  }//render
}//LoginPage

function mapStateToProps(state) {
  // console.log('Edit Page got state' +JSON.stringify(state.projects.project));
  const {alert} = state;
  return {
    alert,
    users: state.users,
    projects: state.projects.projects,
    selectedProject_data: state.projects.project,
  };
}

const connectedEditProjectPage = connect(mapStateToProps)(EditProjectPage);
export {connectedEditProjectPage as EditProjectPage};