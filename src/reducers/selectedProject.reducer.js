import {projectConstants} from '../constants';

export function selectedProject(state = null, action) {
    switch (action.type) {
        case projectConstants.PROJECT_SELECTED:
            return action.payload;
            break;
    }
    return state;
}