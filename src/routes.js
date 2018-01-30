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
import {IssueListPage} from "./containers/IssueListPage"
import {CreateProjectPage} from "./containers/CreateProjectPage"
import {CreateIssuePage} from "./containers/CreateIssuePage"
import {EditIssuePage} from "./containers/EditIssuePage"
import {EditProjectPage} from "./containers/EditProjectPage"
import {CreateTeamMemberPage} from "./containers/CreateTeamMemberPage"
import {TeamMemberListPage} from "./containers/TeamMemberListPage"
import {PricingPage} from "./containers/PricingPage"

import {connect} from 'react-redux';


class Routes extends Component {
   render() {
      return (
         <Router>
            <div>
              <Switch>
                  <Route exact path='/'                 component={HomePage} />
                  <Route exact path='/aboutUs'          component={AboutUsPage} />
                  <Route exact path='/contactUs'        component={ContactUsPage} />
                  <Route exact path='/login'            component={LoginPage} />
                  <Route exact path='/logout'           component={LogoutPage} />
                  <Route exact path='/register'         component={RegisterPage} /> 
                  <Route exact path='/projectList'      component={ProjectListPage} />
                  <Route exact path='/issueList'         component={IssueListPage} />
                  <Route exact path='/createProject'    component={CreateProjectPage} /> 
                  <Route exact path='/editProject'      component={EditProjectPage} />
                  <Route exact path='/createIssue'      component={CreateIssuePage} /> 
                  <Route exact path='/editIssue'        component={EditIssuePage} /> 
                  <Route exact path='/createTeamMember' component={CreateTeamMemberPage} /> 
                  <Route exact path='/teamMemberList'   component={TeamMemberListPage} /> 
                  <Route exact path='/pricing'          component={PricingPage} />  
                  <Route path='*'                       component={NotFoundPage} />                   
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