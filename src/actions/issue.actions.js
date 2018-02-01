import {issueConstants} from '../constants';
import {issueService} from '../services';
import {alertActions} from './';


export const issueActions = {
  
  getAll,
  create,
  getById,
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

//-----------  Request the project of particular id-----------

function getById(key){
  console.log("====== getById ======");

  return (dispatch) => {
    dispatch(request());

    issueService.getById(key)
            .then(
                (issue) => dispatch(success(issue)),
                (error) => {
                  dispatch(failure(error));
                  // dispatch(alertActions.error(error));
                }
            );
  };

  function request() {
    return {type: issueConstants.GET_BY_ID_REQUEST};
  }
  function success(issue) {
    console.log("********* action got issues: " + JSON.stringify(issue) );
    return {type: issueConstants.GET_BY_ID_SUCCESS, issue};
  }
  function failure(error) {
        console.log("********* action got issues failure: " +error );

    return {type: issueConstants.GET_BY_ID_FAILURE, error};
  }
}// getById

// --------------- edit issue------------------------

function edit(id) {

  console.log("====== issue edit ======");

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

