import {settings} from "../config"

export const projectService = { getAll, getById, create, edit };

function _getToken() {
  var user = JSON.parse(localStorage.getItem('user'));
  if(user){
    return user.token;
  }
}

// -----------------------------------------------------------------------------
//     CREATE PROJECT
// -----------------------------------------------------------------------------
function create(project_data) {
  var user = JSON.parse(localStorage.getItem('user'));
  console.log(`[project-service] got user: ${  JSON.stringify(user)}`);
  console.log(`[project-service] got token: ${  user.token}`);

  var body = `&title=${  project_data.title}`;
  body += `&description=${  project_data.description}`;
  body += `&assignee=${  project_data.assignee}`;
  body += `&estimated_hours=${  project_data.estimated_hours}`;
  body += `&start_date=${  project_data.start_date}`;
  body += `&end_date=${  project_data.end_date}`;
  
  body += '&__v=0';
  
  console.log(`[project-service] sending req, body: \n${  body}`);

  const requestOptions = {
    method: 'POST',
    headers: {'x-access-token': _getToken(),'Content-Type': 'application/x-www-form-urlencoded'},
    body: body,
  };
  // console.log(' create project service sending the requestOptions '+JSON.stringify(requestOptions));

  const url = `${settings.API_ROOT}/projects/add`
  return fetch(url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(response.statusText);
          }

          return response.json();
        })
    .then((project_resp) => {
      // console.log(`project-service create project resp: ${  JSON.stringify(project_resp)}` );

      return project_resp;
    })
    .catch( (error) => {
          console.log("==================> error: " + error);
          return error;

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
      if (!response.ok) {
          return Promise.reject(response.statusText);
        }

        return response.json();
        })

    .then((projects) => {
      var reverse_projects = projects.slice().reverse();
      var latest_project = reverse_projects[0];
      console.log('latest_project in project-service '+JSON.stringify(latest_project));
      // console.log(`++++++++ project-service getAll project_resp: ${  JSON.stringify(projects)}` );
      var projects = {
        projects:projects,
        latest_project : latest_project
      };
      return projects;
    });
}// getAll


function getById(id) {
  console.log("====== project-service getById ======");

  const requestOptions = {
      method: 'GET',
      headers: {'x-access-token': _getToken()},
  };
  const url = `${settings.API_ROOT}/projects/by_id/${  id}`
  return fetch(url, requestOptions)
  .then((response) => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();

    })
    .then((project) => {
      // console.log(`++++++++ project-service getAll project_resp: ${  JSON.stringify(projects)}` );
    return project;
    });
}// getById

function edit(project_data) {

  var id = `${  project_data.id}`;
  console.log("====== project-service edit ======" +JSON.stringify(project_data));
  var body = `&title=${  project_data.title}`;
  body += `&description=${  project_data.description}`;
  body += `&assignee=${  project_data.assignee}`;
  body += `&estimated_hours=${  project_data.estimated_hours}`;
  body += `&start_date=${  project_data.start_date}`;
  body += `&end_date=${  project_data.end_date}`;

  
  console.log(' edit project service sending the body '+body);
    const requestOptions = {
        method: 'PUT',
        headers: {'x-access-token': _getToken(), 'Content-Type': 'application/x-www-form-urlencoded'},
        body: body,
    };

    console.log(' edit project service sending the requestOptions '+JSON.stringify(requestOptions));

    const url = `${settings.API_ROOT}/projects/edit/${id}`
    return fetch(url, requestOptions)
    .then((response) => {

          console.log("+++++++ resp: " + response);

          if (!response.ok) {
            return Promise.reject(response.statusText);
          }

          return response.json();
        })
    .then((updatedProject) => {
      console.log(`++++++++ project-service edit updatedProject: ${  JSON.stringify(updatedProject)}` );

      return updatedProject;
    }); 
}// edit

