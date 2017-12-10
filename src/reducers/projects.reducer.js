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

    
    default:
      return state;
  }
}
