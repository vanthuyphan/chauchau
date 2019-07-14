
var API = require('../../common/API');
const USER_API_URL = 'http://127.0.0.1:8080'

export const LOGIN_DONE = 'LOGIN_DONE'
export const GET_USER_COMPLETE = 'GET_USER_COMPLETE'

/*
 * action creators
 */

function setLoginComplete(data) {
    return { type: LOGIN_DONE, data }
}

function setGetUserComeplete(data) {
    return { type: GET_USER_COMPLETE, data }
}

export const userActions = {
    login: (username, password) => dispatch => {
        API.login(username, password, data => {
            dispatch(setLoginComplete(data))
        })
    },
};

