import {issueConstants} from '../constants';

export function issues(state = {}, action) {
  switch (action.type) {
    case issueConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case issueConstants.GETALL_SUCCESS:
    console.log("issues reducer got response" + action.issues);
      return  action.issues ;
    case issueConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
  