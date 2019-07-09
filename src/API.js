/**
 * Created by Van Phan
 */
"use strict";

let axios = require('axios');

const domain = "http://127.0.0.1:8080";

exports.login = (username, password, cb) => {
    console.log("API", "/login");

    const url = domain + '/login';
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

function getRequest(data, callback) {
    let headers = {
        'Content-type': 'application/json'
    };
    if (data.headers.Authentication) {
        headers['Authentication'] = data.headers.Authentication;
    }
    const authOptions = {
        method: 'GET',
        url: data.url,
        headers: headers,
        data: data.body,
        json: true,
        timeout: 60000,
    };

    const track = tracker.section(data.url, domain);
    return httpClient(authOptions)
        .then(function (response) {
            try {
                track();
                handleResponse(data.url, data, response.data, callback);
            } catch (e) {
                tracker.print(e, "error");
                console.error(e);
            }
        })
        .catch(function (error) {
            console.log("################");
            track(error);
            if (error) tracker.print(error, "Backend.HttpError");
            callback(error, data);
        });
}

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
                track();
                handleResponse(data.url, data, response.data, callback);
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
    callback(undefined, res);
    return;
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
