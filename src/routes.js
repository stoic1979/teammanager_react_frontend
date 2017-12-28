import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {HomePage} from "./containers/HomePage"
import {AboutUsPage} from "./containers/AboutUsPage"
import {ContactUsPage} from "./containers/ContactUsPage"
import {LoginPage} from "./containers/LoginPage"
import {LogoutPage} from "./containers/LogoutPage"
import {RegisterPage} from "./containers/RegisterPage"
import {NotFoundPage} from "./containers/NotFoundPage"
import {ProjectListPage} from "./containers/ProjectListPage"
import {ProjectPage} from "./containers/ProjectPage"
import {CreateProjectPage} from "./containers/CreateProjectPage"
import {CreateIssuePage} from "./containers/CreateIssuePage"
import {CreateTeamPage} from "./containers/CreateTeamPage"
import {TeamListPage} from "./containers/TeamListPage"

import {connect} from 'react-redux';


class Routes extends Component {
   render() {
      return (
         <Router>
            <div>
              <Switch>
                  <Route exact path='/'              component={HomePage} />
                  <Route exact path='/aboutUs'       component={AboutUsPage} />
                  <Route exact path='/contactUs'     component={ContactUsPage} />
                  <Route exact path='/login'         component={LoginPage} />
                  <Route exact path='/logout'        component={LogoutPage} />
                  <Route exact path='/register'      component={RegisterPage} /> 
                  <Route exact path='/projectList'   component={ProjectListPage} />
                  <Route exact path='/project'       component={ProjectPage} />
                  <Route exact path='/createProject' component={CreateProjectPage} /> 
                  <Route exact path='/createIssue'   component={CreateIssuePage} /> 
                  <Route exact path='/createTeam'       component={CreateTeamPage} /> 
                  <Route exact path='/teamList'       component={TeamListPage} /> 
                  <Route path='*'                    component={NotFoundPage} />                   
              </Switch>
            </div>
         </Router>
      );
   }
}//Routes


function mapStateToProps(state) {
  const {alert, loggedIn} = state;
  return {
    alert, loggedIn
  };
}

const connectedRoutes = connect(mapStateToProps)(Routes);
export {connectedRoutes as Routes};