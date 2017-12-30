import {teamConstants} from '../constants';

export function team(state = {}, action) {
  switch (action.type) {
    case teamConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case teamConstants.GETALL_SUCCESS:
    console.log("team reducer got response" + action.team);
      return  action.team ;
    case teamConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
