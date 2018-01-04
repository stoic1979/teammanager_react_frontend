import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Container,Col,Row} from 'react-grid-system';
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
      marginBottom:40,
     },
  sbt:{
      marginLeft:'10%',
   },
 };

//---------------------------------------------------
//
//         LOGIN PAGE
//
//---------------------------------------------------
class CreateProjectPage extends React.Component {

  // ------------------------------------------------
  // constructor
  // ------------------------------------------------
  constructor(props){
    super(props);

    this.state = {     
      description:'',
      title:'',
      
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

    console.log('-- create project handleSubmit --');

    this.setState({submitted: true});
    const {description, title} = this.state;
    var  project_data={description,  title };
    const {dispatch} = this.props;
    console.log("project_data" +JSON.stringify(project_data));

    if (description && title  ) {
      console.log('dispatching -> create project');
      // var history = this.props.history;
      dispatch(projectActions.create( project_data));
    }
  }

render() {
  const {description, title} = this.state;
  return (
    <div>
      <MuiThemeProvider>
        <form name="form" onSubmit={this.handleSubmit}> 
          <div style={styles.Container}>
            <h3>Create Project</h3>
            <TextField
              hintText="Title"
              floatingLabelText="Title "
              name="title"
              value={title}
              onChange={this.handleChange} 
            />
            <br/>
            <TextField
              hintText="Description"
              floatingLabelText="Description"
              name="description"
              value={description}
              onChange={this.handleChange} 
            />
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
  };
}

const connectedCreateProjectPage = connect(mapStateToProps)(CreateProjectPage);
export {connectedCreateProjectPage as CreateProjectPage};