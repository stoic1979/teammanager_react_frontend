import {teamConstants} from '../constants';
import {teamService} from '../services';
import {alertActions} from './';


export const teamActions = {
  
  getAll,
  selectedTeam,
  // create
  
};

// // -----------------------------------------------------------------------------
// //     CREATE TEAM
// // -----------------------------------------------------------------------------
// function create(project_data) {
//   console.log('[project-action] create()');

//   return (dispatch) => {
//     dispatch(request({project_data}));

//     projectService.create(project_data)
//             .then(
//                 (project_data) => {
//                   dispatch(success(project_data));
//                   console.log('action:create project: push /');
//                   // browserHistory.push('/familyList');
//                 },
//                 (error) => {
//                   dispatch(failure(error));
//                   dispatch(alertActions.error(error));
//                 }
//             );
//   };

//   function request(project) {
//     return {type: teamActions.CREATE_REQUEST, project_data};
//   }
//   function success(project) {
//     return {type: teamActions.CREATE_SUCCESS, project_data};
//   }
//   function failure(error) {
//     return {type: teamActions.CREATE_FAILURE, error};
//   }
// }// create


// 
//-------------------Request  list of team --------------------
//


function getAll() {

  console.log("====== getAll ======");

  return (dispatch) => {
    dispatch(request());

    teamService.getAll()
            .then(
                (team) => dispatch(success(team)),
                (error) => dispatch(failure(error))
            );
  };

  

  function request() {
    return {type: teamActions.GETALL_REQUEST};
  }
  function success(team) {
    console.log("********* action got team: " + JSON.stringify(team) );
    return {type: teamActions.GETALL_SUCCESS, team};
  }
  function failure(error) {
        console.log("********* action got team failure: " +error );

    return {type: teamActions.GETALL_FAILURE, error};
  }
}

function selectedTeam(key){
    console.log("++++ team actions, selectedTeam() key: ", key);
    return {
        type: teamActions.PROJECT_SELECTED,
        payload: key
    }
}




