import {authHeader} from '../helpers';
import {settings} from "../config"

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById
};

function _getToken() {
  var user = JSON.parse(localStorage.getItem('user'));
  if(user){
    return user.token;
    }
}

function login(history,email, password) {
    var body = `email=${email  }&password=${  password}`;

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: body,
    };

    console.log("----> body: " + body);
    console.log("API root: " + settings.API_ROOT);

    const url = `${settings.API_ROOT}/users/login`
    return fetch(url, requestOptions)
        .then((response) => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
    .then((token_resp) => {
        console.log(`----->>> token_resp: ${  JSON.stringify(token_resp)}` );


        if (!token_resp.success) {
                return Promise.reject(token_resp.message);
            }

        // ----------------------------------------------------------
        // login successful if there's a jwt token in the response
        // ----------------------------------------------------------
        if (token_resp && token_resp.token) {
            var user = {
                email: email,
                role:token_resp.role,
                token: token_resp.token,
                message:token_resp.message,
            };

            // ------------------------------------------------------
            // store user details and jwt token in local storage
            // to keep user logged in between page refreshes
            // ------------------------------------------------------
            localStorage.setItem('user', JSON.stringify(user));
            history.push('/');
        }

        return user;
    });
}

function logout(history) {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('API');
    history.push("/login");
}

function register(user) {
    var body = `first_name=${user.first_name}&last_name=${user.last_name  }&email=${user.email}&password=${  user.password  }&role=${  user.role}&team_name=${ user.team_name }`;

    console.log(`body: ${  body}`);

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: body,
    };
    const url = `${settings.API_ROOT}/users/signup`
    return fetch(url, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: {'x-access-token': _getToken()},
    };
    const url = `${settings.API_ROOT}/users/all`
    return fetch(url, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`/users/${  id}`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}


