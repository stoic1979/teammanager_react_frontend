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
    case issueConstants.GET_BY_ID_SUCCESS:
      console.log("issue reducer got response" + action.issue);
      return  {
        issue:action.issue 
      };
    case issueConstants.GET_BY_ID_FAILURE:
      return {
        error: action.error,
      };
    case issueConstants.ISSUE_SELECTED:
      return {
        selectedIssue: action.payload,
      };
    default:
      return state;
  }
}
  