import {projectConstants} from '../constants';

export function selectedStudy(state = null, action) {
    switch (action.type) {
        case projectConstants.SELECTED_PROJECT:
            return action.payload;
            break;
    }
    return state;
}