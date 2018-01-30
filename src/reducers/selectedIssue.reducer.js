import {issueConstants} from '../constants';

export function selectedIssue(state = null, action) {
    switch (action.type) {
        case issueConstants.SELECTED_ISSUE_GET_REQUEST:
        	return {
        		loading: true,
        	}
            break;
        case issueConstants.SELECTED_ISSUE_GET_SUCCESS:
            return action.selectedIssue;
            break;
        case issueConstants.SELECTED_ISSUE_GET_FAILURE:
            return action.error;
            break;
        default:
      		return state;
    }
    return state;
}