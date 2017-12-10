import {projectConstants} from '../constants';
import {projectService} from '../services';
import {alertActions} from './';


export const projectActions = {
  
  getAll,
  selectedProject,
  create
  
};

// -----------------------------------------------------------------------------
//     CREATE FAMILY
// -----------------------------------------------------------------------------
function create(project_data) {
  console.log('[project-action] create()');

  return (dispatch) => {
    dispatch(request({project_data}));

    projectService.create(project_data)
            .then(
                (project_data) => {
                  dispatch(success(project_data));
                  console.log('action:create project: push /');
                  // browserHistory.push('/familyList');
                },
                (error) => {
                  dispatch(failure(error));
                  dispatch(alertActions.error(error));
                }
            );
  };

  function request(project) {
    return {type: projectConstants.CREATE_REQUEST, project_data};
  }
  function success(project) {
    return {type: projectConstants.CREATE_SUCCESS, project_data};
  }
  function failure(error) {
    return {type: projectConstants.CREATE_FAILURE, error};
  }
}// create


// 
//-------------------Request  list of projects --------------------
//


function getAll() {

  console.log("====== getAll ======");

  return (dispatch) => {
    dispatch(request());

    projectService.getAll()
            .then(
                (projects) => dispatch(success(projects)),
                (error) => dispatch(failure(error))
            );
  };

  

  function request() {
    return {type: projectConstants.GETALL_REQUEST};
  }
  function success(projects) {
    console.log("********* action got projects: " + JSON.stringify(projects) );
    return {type: projectConstants.GETALL_SUCCESS, projects};
  }
  function failure(error) {
        console.log("********* action got projects failure: " +error );

    return {type: projectConstants.GETALL_FAILURE, error};
  }
}

function selectedProject(key){
    console.log("++++ project actions, selectedProject() key: ", key);
    return {
        type: projectConstants.PROJECT_SELECTED,
        payload: key
    }
}

function selectedProject(key){
    console.log("++++ project actions, selectedProject() key: ", key);
    return {
        type: projectConstants.SELECTED_PROJECT,
        payload: key
    }
}


