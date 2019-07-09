/**
 * Created by Van Phan
 */
"use strict";

let axios = require('axios');

const domain = "http://127.0.0.1:8080";

exports.login = (username, password, cb) => {
    const url = domain + '/auth/login';
    const data = {
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    };
    console.log("Data", data);
    request(data, function (err, body) {
        cb(err, body);
    });
}

exports.updateUser = (id, username, firstname, lastname, avatar, password, cb) => {
    console.log("API", "/user/update");

    const url = domain + '/user/update/' + id;
    const data = {
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, firstname, lastname, avatar,  password})
    };
    console.log("Data", data);
    request(data, function (err, body) {
        cb(err, body);
    });
}

exports.logout = (username, cb) => {
    console.log("API", "/logout");

    const url = domain + '/logout';
    const data = {
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username})
    };
    request(data, function (err, body) {
        cb(err, body);
    });
}

exports.register = (username, firstname, lastname, password, role, cb) => {
    console.log("API", "/register");
    const url = domain + '/register';
    const data = {
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, firstname, lastname, password, role})
    };
    console.log("Request", data.body);
    request(data, (err, httpResponse, body) => {
        cb(err, body);
    });
}


const httpClient = axios.create(); // create instance to make Timeout feature works


function request(data, callback) {
    let headers = {
        'Content-type': 'application/json'
    };
    if (data.headers.Authentication) {
        headers['Authentication'] = data.headers.Authentication;
    }
    const authOptions = {
        method: 'POST',
        url: data.url,
        headers: headers,
        data: data.body,
        json: true,
        timeout: 60000,
    };

    return httpClient(authOptions)
        .then(function (response) {
            try {
                handleResponse(data.url, data, response, callback);
            } catch (e) {
                console.error(e);
            }
        })
        .catch(function (error) {
            console.log("################");
            callback(error, data);
        });
}

function handleResponse(url, req, res, callback) {
    if (!res || res.code === undefined) {
        callback(res, res);
        return;
    }
    switch (res.code) {
        case 0:
            callback(undefined, res);
            break;
        case 408:
            callback(undefined, res);
            console.log("Session expired, please login again!");
            return;
        case 500:
        default:
            callback(res, res)
    }
}
