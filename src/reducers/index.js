import {combineReducers} from 'redux';

import {authentication} from './authentication.reducer';
import {registration} from './registration.reducer';
import {users} from './users.reducer';
import {alert} from './alert.reducer';
import {projects} from './projects.reducer';
import {issues} from './issues.reducer';
import {tasks} from './tasks.reducer';
import {selectedProject} from './selectedProject.reducer';



const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  projects,
  selectedProject,
  tasks,
  issues,

});

export default rootReducer;
