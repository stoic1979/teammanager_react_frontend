import React, { Component } from 'react';
import './App.css';
import {Header} from "./components/Header"
import Drawer from 'material-ui/Drawer';
import Footer from "./components/Footer"
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import DropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import Issue from 'material-ui/svg-icons/alert/error';
import GroupAdd from 'material-ui/svg-icons/social/group-add';
import {projectActions} from './actions';
import {Routes} from './routes'
import {issueActions} from './actions';

import {connect} from 'react-redux';
import {literals} from "./config"

// --------------------------css style--------------------------------------
const styles = {  
    txt: {
      marginLeft: 15
     }
  };
// -----------------------------------------------------------------------
//
//            APP
// 
// -----------------------------------------------------------------------
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};

  }

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    if(user){
      const {dispatch} = this.props;
      var resp = dispatch(projectActions.getAll());
      }
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handle = () =>console.log("Sorry ! You don't have a access to sidebar");
  
  handleOpenMenu = () => {
    this.setState({
      openMenu: true,
    });
  }

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value,
    });
  }

  handleChange = (event, value) => {
    console.log("project id in app--------->"+value);
    
    var project_id =value;
    const {dispatch} = this.props;
    var issues = dispatch(issueActions.getAll(project_id));
    
  };

    // ------------------------------------------------
    // render UI
    // ------------------------------------------------
    render() {
       var item=[];
       if (this.props.projects) {
        
          for (var i = 0; i < this.props.projects.length; i++) {
            // console.log(`projects ${  i + 1  }:${  JSON.stringify(this.props.projects[i])}`);
            var pro = this.props.projects[i];
            
            item.push(
              <MenuItem value={pro._id}   primaryText={pro.title} />
              );
          }
        }
     
      const contentStyle = {  transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' };
      const {loggedIn} = this.props;
      var {user}      = this.props;
      if(user){
        var role=user.role;
      }
      
      console.log('user logged in ' +JSON.stringify(loggedIn));
      console.log('user in App '+JSON.stringify(user));
      console.log('role in app '+role);
      if (this.state.open) {
        contentStyle.marginLeft = 245;
      }
      return (
         <div style={contentStyle}>
          <MuiThemeProvider>
            <Header 
            onClick={role=="MANAGER" ? this.handleToggle : this.handle}

            />
            <Drawer width={245} open={this.state.open}>  
              <AppBar title="TEAM  MANAGER" showMenuIconButton={false}/>
              <MenuItem   leftIcon={<RemoveRedEye />}>
                <FlatButton onClick={this.handleOpenMenu} label="Projects" />
                <IconMenu
                 iconButtonElement={<IconButton><DropDown /></IconButton>}
                 open={this.state.openMenu}
                 onRequestChange={this.handleOnRequestChange}
                 onChange={this.handleChange}
                >
                  {item}
                </IconMenu>
              </MenuItem>
             
              <MenuItem href="/issueList" leftIcon={<Issue />} ><div style={styles.txt}>ISSUES</div></MenuItem>
              <MenuItem href="/teamMemberList" leftIcon={<GroupAdd />} ><div style={styles.txt}>TEAM</div></MenuItem>
              
            </Drawer>
            <hr />
            <Routes/>
            <Footer />
          </MuiThemeProvider>
        </div>

      );//return

    }//render

}//App

function mapStateToProps(state) {
  const {alert} = state;
  // console.log("App got state "+JSON.stringify(state));
  return {
    alert,
    projects: state.projects,
    user: state.authentication.user,
    loggedIn:state.authentication.loggedIn
  };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};