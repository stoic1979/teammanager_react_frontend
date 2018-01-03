import {teamMemberConstants} from '../constants';
import {teamMemberService} from '../services';
import {alertActions} from './';


export const teamMemberActions = {
  
  getAll,
  selectedTeam,
  create
  
};

// -----------------------------------------------------------------------------
//     CREATE TEAM MEMBER
// -----------------------------------------------------------------------------
function create(email) {
  console.log('[team-member-action] create()');

  return (dispatch) => {
    dispatch(request({email}));

    teamMemberService.create(email)
            .then(
                (email) => {
                  dispatch(success(email));
                  console.log('action:create email: push /');
                  // browserHistory.push('/familyList');
                },
                (error) => {
                  dispatch(failure(error));
                  dispatch(alertActions.error(error));
                }
            );
  };

  function request(email) {
    return {type: teamMemberConstants.CREATE_REQUEST, email};
  }
  function success(email) {
    return {type: teamMemberConstants.CREATE_SUCCESS, email};
  }
  function failure(error) {
    return {type: teamMemberConstants.CREATE_FAILURE, error};
  }
}// create


// 
//-------------------Request  list of team --------------------
//


function getAll() {

  console.log("====== getAll ======");

  return (dispatch) => {
    dispatch(request());

    teamMemberService.getAll()
            .then(
                (team_member) => dispatch(success(team_member)),
                (error) => dispatch(failure(error))
            );
  };

  

  function request() {
    return {type: teamMemberConstants.GETALL_REQUEST};
  }
  function success(team_member) {
    console.log("********* action got team: " + JSON.stringify(team_member) );
    return {type: teamMemberConstants.GETALL_SUCCESS, team_member};
  }
  function failure(error) {
        console.log("********* action got team failure: " +error );

    return {type: teamMemberConstants.GETALL_FAILURE, error};
  }
}

function selectedTeam(key){
    console.log("++++ team actions, selectedTeam() key: ", key);
    return {
        type: teamMemberConstants.PROJECT_SELECTED,
        payload: key
    }
}




