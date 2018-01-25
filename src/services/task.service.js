import {settings} from "../config"

export const taskService = { getAll,create };

function _getToken() {
  var user = JSON.parse(localStorage.getItem('user'));
  if(user){
    return user.token;
  }
}

// -----------------------------------------------------------------------------
//     CREATE PROJECT
// -----------------------------------------------------------------------------
function create(task_data) {
  var user = JSON.parse(localStorage.getItem('user'));
  console.log(`[project-service] got user: ${  JSON.stringify(user)}`);
  console.log(`[project-service] got token: ${  user.token}`);

  var body = `created_at=${  task_data.created_at}`;
  body += `&updated_at=${  task_data.updated_at}`;
  body += `&title=${  task_data.title}`;
  body += `&description=${  task_data.description}`;
  body += `&type_id=${  task_data.manager}`;
  body += '&__v=0';
  
  console.log(`[project-service] sending req, body: \n${  body}`);

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: body,
  };
  const url = `${settings.API_ROOT}/add_task`
  return fetch(url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(response.statusText);
          }

          return response.json();
        })
    .then((task_resp) => {
      console.log(`project-service create project resp: ${  JSON.stringify(task_resp)}` );

      return task_resp;
    });
}// create

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: {'x-access-token': _getToken()},
    };
    const url = `${settings.API_ROOT}/tasks/all`
    return fetch(url, requestOptions)
    .then((response) => {
          if (!response.ok) {
            return Promise.reject(response.statusText);
          }

          return response.json();
        })
    .then((tasks) => {
      console.log(`task-service getAll project_resp: ${  JSON.stringify(tasks)}` );

      return tasks;
    });
}// getAll




