var API = require('../../../common/API');
const USER_API_URL = 'http://127.0.0.1:8080'

class LoginService {
    login(username, password) {
        API.login(username, password, (data) => {("Result", data.data)})
    }
}

export default new LoginService();
