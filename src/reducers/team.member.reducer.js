import {teamMemberConstants} from '../constants';

export function teamMember(state = {}, action) {
  switch (action.type) {
    case teamMemberConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case teamMemberConstants.GETALL_SUCCESS:
    console.log("team member  reducer got response" + action.team_member);
      return  action.team_member ;
    case teamMemberConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
