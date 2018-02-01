import {projectConstants} from '../constants';

export function projects(state = {}, action) {
  switch (action.type) {
    case projectConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case projectConstants.GETALL_SUCCESS:
    console.log("project reducer got response" + action.projects);
      return  action.projects ;
    case projectConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case projectConstants.GET_BY_IDL_REQUEST:
      return {
        loading: true,
      };
    case projectConstants.GET_BY_ID_SUCCESS:
    console.log("project reducer got response" + action.project);
      return  {
        project:action.project 
      };
    case projectConstants.GET_BY_ID_FAILURE:
      return {
        error: action.error,
      };
    case projectConstants.PROJECT_SELECTED:
      return {
        selectedProject: action.payload,
      };
    default:
      return state;
  }
}
