import {projectConstants} from '../constants';

export function selectedProject(state = null, action) {
    switch (action.type) {
        case projectConstants.SELECTED_PROJECT_GET_REQUEST:
        	return {
        		loading: true,
        	}
            break;
        case projectConstants.SELECTED_PROJECT_GET_SUCCESS:
            return action.selectedProject;
            break;
        case projectConstants.SELECTED_PROJECT_GET_FAILURE:
            return action.error;
            break;
        default:
      		return state;
    }
    return state;
}