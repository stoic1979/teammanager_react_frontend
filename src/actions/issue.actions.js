import {issueConstants} from '../constants';
import {issueService} from '../services';
import {alertActions} from './';


export const issueActions = {
  
  getAll,
  create,
  selectedIssue,
  edit
  
};

// -----------------------------------------------------------------------------
//     CREATE FAMILY
// -----------------------------------------------------------------------------
function create(issue_data) {
  console.log('[issue-action] create()');

  return (dispatch) => {
    dispatch(request({issue_data}));

    issueService.create(issue_data)
            .then(
                (issue_data) => {
                  dispatch(success(issue_data));
                  console.log('action:create issue: push /');
                  // browserHistory.push('/familyList');
                },
                (error) => {
                  dispatch(failure(error));
                  // dispatch(alertActions.error(error));
                }
            );
  };

  function request(issue) {
    return {type: issueConstants.CREATE_REQUEST, issue_data};
  }
  function success(issue) {
    return {type: issueConstants.CREATE_SUCCESS, issue_data};
  }
  function failure(error) {
    return {type: issueConstants.CREATE_FAILURE, error};
  }
}// create


// 
//-------------------Request  list of projects --------------------
//


function getAll(selectedProject) {

  console.log("====== getAll ======");
  console.log("selectedProject in issue action "+selectedProject);
  return (dispatch) => {
    dispatch(request());

    issueService.getAll(selectedProject)
            .then(
                (issues) => dispatch(success(issues)),
                (error) => {
                  dispatch(failure(error));
                  // dispatch(alertActions.error(error));
                }
            );
  };

  

  function request() {
    return {type: issueConstants.GETALL_REQUEST};
  }
  function success(issues) {
    // console.log("********* action got issues: " + JSON.stringify(issues) );
    return {type: issueConstants.GETALL_SUCCESS, issues};
  }
  function failure(error) {
        console.log("********* action got issues failure: " +error );

    return {type: issueConstants.GETALL_FAILURE, error};
  }
}


// --------------- edit issue------------------------

function edit(id) {

  console.log("====== project edit ======");

  return (dispatch) => {
    dispatch(request());

    issueService.edit()
            .then(
                (updatedIssue) => dispatch(success(updatedIssue)),
                (error) => {
                  dispatch(failure(error));
                  // dispatch(alertActions.error(error));
                }
            );
  };

  function request() {
    return {type: issueConstants.UPDATE_REQUEST};
  }
  function success(updatedIssue) {
    // console.log("********* action got updatedIssue: " + JSON.stringify(updatedIssue) );
    return {type: issueConstants.UPDATE_SUCCESS, updatedIssue};
  }
  function failure(error) {
    // console.log("********* action got updatedIssue failure: " +error );
    return {type: issueConstants.UPDATE_FAILURE, error};
  }
}// edit

function selectedIssue(key){
    console.log("++++ issue actions, selectedIssue() key: ", key);
    return {
        type: issueConstants.ISSUE_SELECTED,
        payload: key
    }
}

