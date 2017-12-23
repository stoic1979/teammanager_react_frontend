import {settings} from "../config"


export const projectService = { getAll,create };


function _getToken() {
  var user = JSON.parse(localStorage.getItem('user'));
  return user.token;
}


// -----------------------------------------------------------------------------
//     CREATE PROJECT
// -----------------------------------------------------------------------------
function create(project_data) {
  var user = JSON.parse(localStorage.getItem('user'));
  console.log(`[project-service] got user: ${  JSON.stringify(user)}`);
  console.log(`[project-service] got token: ${  user.token}`);

  var body = `created_at=${  project_data.created_at}`;
  body += `&updated_at=${  project_data.updated_at}`;
  body += `&title=${  project_data.title}`;
  body += `&description=${  project_data.description}`;
  body += `&type_id=${  project_data.manager}`;
  body += '&__v=0';
  

  console.log(`[project-service] sending req, body: \n${  body}`);


  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: body,
  };
  const url = `${settings.API_ROOT}/add_project`
  return fetch(url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(response.statusText);
          }

          return response.json();
        })
    .then((project_resp) => {
      console.log(`project-service create project resp: ${  JSON.stringify(project_resp)}` );

      return project_resp;
    })
    .catch( (error) => {
          console.log("==================> error: " + error);

    });
}// create

function getAll() {

    console.log("====== project-service getAll ======");


    const requestOptions = {
        method: 'GET',
        headers: {'x-access-token': _getToken()},
    };
    const url = `${settings.API_ROOT}/projects/all`
    return fetch(url, requestOptions)
    .then((response) => {

          console.log("+++++++ resp: " + response);

          if (!response.ok) {
            return Promise.reject(response.statusText);
          }

          return response.json();
        })
    .then((projects) => {
      console.log(`++++++++ project-service getAll project_resp: ${  JSON.stringify(projects)}` );

      return projects;
    });
}// getAll




