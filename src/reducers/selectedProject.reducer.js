import {projectConstants} from '../constants';

export function selectedProject(state = null, action) {
    switch (action.type) {
        case projectConstants.SELECTED_PROJECT:
            return action.payload;
            break;
        default:
      		return state;
    }
    return state;
}