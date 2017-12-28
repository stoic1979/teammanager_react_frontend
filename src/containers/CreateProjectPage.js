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
      created_at:'',
      updated_at:' ',
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

    console.log('-- create project handleSubmit --');

    this.setState({submitted: true});
    const {description, created_at, updated_at, title, manager } = this.state;
    var  project_data={description, created_at, updated_at, title, manager };
    const {dispatch} = this.props;
    console.log("project_data" +JSON.stringify(project_data));

    if (description && created_at && updated_at && title && manager ) {
      console.log('dispatching -> create project');
      // var history = this.props.history;
      dispatch(projectActions.create( project_data));
    }
  }

render() {
  const {description,  created_at, updated_at, title, manager} = this.state;
  return (
    <div>
      <MuiThemeProvider>
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
                  <TextField
                    hintText="Manager"
                    floatingLabelText="Manager"
                    name="manager"
                    value={manager}
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
                    hintText="Description"
                    floatingLabelText="Description"
                    name="description"
                    value={description}
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
  const {alert} = state;
  return {
    alert,
  };
}

const connectedCreateProjectPage = connect(mapStateToProps)(CreateProjectPage);
export {connectedCreateProjectPage as CreateProjectPage};