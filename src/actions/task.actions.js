import {taskConstants} from '../constants';
import {taskService} from '../services';
import {alertActions} from './';


export const taskActions = {
  
  getAll,
 
  create
  
};

// -----------------------------------------------------------------------------
//     CREATE FAMILY
// -----------------------------------------------------------------------------
function create(task_data) {
  console.log('[project-action] create()');

  return (dispatch) => {
    dispatch(request({task_data}));

    taskService.create(task_data)
            .then(
                (project_data) => {
                  dispatch(success(task_data));
                  console.log('action:create project: push /');
                  // browserHistory.push('/familyList');
                },
                (error) => {
                  dispatch(failure(error));
                  // dispatch(alertActions.error(error));
                }
            );
  };

  function request(project) {
    return {type: taskConstants.CREATE_REQUEST, task_data};
  }
  function success(project) {
    return {type: taskConstants.CREATE_SUCCESS, task_data};
  }
  function failure(error) {
    return {type: taskConstants.CREATE_FAILURE, error};
  }
}// create


// 
//-------------------Request  list of projects --------------------
//


function getAll() {
  return (dispatch) => {
    dispatch(request());

    taskService.getAll()
            .then(
                (tasks) => dispatch(success(tasks)),
                (error) => {
                  dispatch(failure(error));
                  // dispatch(alertActions.error(error));
                }
            );
  };

  

  function request() {
    return {type: taskConstants.GETALL_REQUEST};
  }
  function success(tasks) {
    // console.log("--- action got projects: " + JSON.stringify(projects) );
    return {type: taskConstants.GETALL_SUCCESS, tasks};
  }
  function failure(error) {
    return {type: taskConstants.GETALL_FAILURE, error};
  }
}




