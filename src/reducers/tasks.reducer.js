import {taskConstants} from '../constants';

export function tasks(state = {}, action) {
  switch (action.type) {
    case taskConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case taskConstants.GETALL_SUCCESS:
    console.log("task reducer got response" + action.tasks);
      return  action.projects ;
    case taskConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
