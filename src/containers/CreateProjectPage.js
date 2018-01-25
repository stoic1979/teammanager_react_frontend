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
      marginLeft:'10%',
   },
 };

//---------------------------------------------------
//
//         CREATE PROJECT PAGE
//
//---------------------------------------------------
class CreateProjectPage extends React.Component {

  // ------------------------------------------------
  // constructor
  // ------------------------------------------------
  constructor(props){
    super(props);

    this.state = {     
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

    const {dispatch} = this.props;
    dispatch(userActions.getAll());
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
    const {description, title, assignee, estimated_hours, start_date, end_date} = this.state;
    var  project_data={description, title, assignee, estimated_hours, start_date, end_date };
    const {dispatch} = this.props;
    console.log("project_data" +JSON.stringify(project_data));

    if (description && title  ) {
      console.log('dispatching -> create project');
      // var history = this.props.history;
      dispatch(projectActions.create( project_data));
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
            <h3>Create Project</h3>
            <Container>
              <Row>
                <Col sm={6}>
                  <TextField
                    hintText="Title"
                    floatingLabelText="Title "
                    name="title"
                    value={title}
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
                    hintText="Start Date"
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
                    value={description}
                    onChange={this.handleChange} 
                  />
                  <TextField
                    hintText="Estimated hours"
                    floatingLabelText="Estimated hours"
                    name="estimated_hours"
                    value={estimated_hours}
                    onChange={this.handleChange} 
                  />
                  <DatePicker
                    floatingLabelText="End Date"
                    hintText="End Date"
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
  const {alert} = state;
  return {
    alert,
    users: state.users
  };
}

const connectedCreateProjectPage = connect(mapStateToProps)(CreateProjectPage);
export {connectedCreateProjectPage as CreateProjectPage};