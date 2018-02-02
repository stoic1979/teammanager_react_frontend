import {settings} from "../config"

export const issueService = { getAll, getById, create, edit};

function _getToken() {
  var user = JSON.parse(localStorage.getItem('user'));
  if(user){
    return user.token;
  }
}

// -----------------------------------------------------------------------------
//     CREATE ISSUE
// -----------------------------------------------------------------------------

function create(issue_data) {
  var user = JSON.parse(localStorage.getItem('user'));
  console.log(`[issue-service] got user: ${  JSON.stringify(user)}`);
  console.log(`[issue-service] got token: ${  user.token}`);

  var body = `&project=${issue_data.project}`;
  body += `&assignee=${issue_data.assignee}`;
  body += `&summary=${issue_data.summary}`;
  body += `&description=${issue_data.description}`;
  body += `&type=${issue_data.type}`;
  body += `&priority=${issue_data.priority}`;
  body += `&status=${issue_data.status}`;
  body += `&estimated_hours=${issue_data.estimated_hours}`;
  body += `&start_date=${issue_data.start_date}`;
  body += `&end_date=${issue_data.end_date}`;
  body += `&created_at=${issue_data.created_at}`;
  body += `&updated_at=${issue_data.updated_at}`;
  
  body += '&__v=0';
  
  console.log(`[issue-service] sending req, body: \n${  body}`);

  const requestOptions = {
    method: 'POST',
    headers: {'x-access-token': _getToken(),'Content-Type': 'application/x-www-form-urlencoded'},
    body: body,
  };
  const url = `${settings.API_ROOT}/issues/add`
  return fetch(url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(response.statusText);
          }

          return response.json();
        })
    .then((issue_resp) => {
      console.log(`issue-service create issue resp: ${  JSON.stringify(issue_resp)}` );

      return issue_resp;
    })
    .catch( (error) => {
          console.log("==================> error: " + error);
      });
}// create

function getAll(selectedProject) {

  console.log("====== issue-service getAll ======");
  console.log("selectedProject in issue service " +selectedProject);

    const requestOptions = {
        method: 'GET',
        headers: {'x-access-token': _getToken()},
    };
    const url = `${settings.API_ROOT}/issues/all_by_project/${selectedProject}`
    return fetch(url, requestOptions)
    .then((response) => {

          console.log("+++++++ resp: " + response);

          if (!response.ok) {
            return Promise.reject(response.statusText);
          }

          return response.json();
        })
    .then((issues) => {
      // console.log(`++++++++ issue-service getAll issue_resp: ${  JSON.stringify(issues)}` );

      return issues;
    });
}// getAll

function getById(id) {
  console.log("====== issue-service getById ======");

  const requestOptions = {
      method: 'GET',
      headers: {'x-access-token': _getToken()},
  };
  const url = `${settings.API_ROOT}/issues/by_id/${  id}`
  return fetch(url, requestOptions)
  .then((response) => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();

    })
    .then((issue) => {
      // console.log(`++++++++ issue-service getAll project_resp: ${  JSON.stringify(projects)}` );
    return issue;
    });
}// getById


function edit(issue_data) {

  console.log("====== issue-service edit ======");
  var id = `${  issue_data.id}`;
  console.log("====== project-service edit ======" +JSON.stringify(issue_data));
  var body = `&summary=${  issue_data.summary}`;
  body += `&description=${  issue_data.description}`;
  body += `&assignee=${  issue_data.assignee}`;
  body += `&project=${  issue_data.project}`;
  body += `&type=${  issue_data.type}`;
  body += `&status=${  issue_data.status}`;
  body += `&priority=${  issue_data.priority}`;
  body += `&estimated_hours=${  issue_data.estimated_hours}`;
  body += `&start_date=${  issue_data.start_date}`;
  body += `&end_date=${  issue_data.end_date}`;
  
  console.log(' edit project service sending the body '+body);
    const requestOptions = {
        method: 'PUT',
        headers: {'x-access-token': _getToken(), 'Content-Type': 'application/x-www-form-urlencoded'},
        body: body,
    };
  console.log(' edit project service sending the requestOptions '+requestOptions);
    const url = `${settings.API_ROOT}/issues/edit/${id}`
    return fetch(url, requestOptions)
    .then((response) => {

          console.log("+++++++ resp: " + response);

          if (!response.ok) {
            return Promise.reject(response.statusText);
          }

          return response.json();
        })
    .then((updatedIssue) => {
      // console.log(`++++++++ issue-service edit updatedIssue: ${  JSON.stringify(updatedIssue)}` );

      return updatedIssue;
    });
}// edit

