import axios from 'axios';

const USER_API_URL = 'http://localhost:8080'
class UsersDataService {
  retrieveAllClient() {
    console.log ('api get all user'+ USER_API_URL + '/api/user/listall');
    return axios.get(USER_API_URL + '/api/user/listall');
  }

  deleteClient(listUserId) {
    return axios.delete(USER_API_URL + '/api/delete',{
      data: {listUserId } }) ;
  }
}
export default new UsersDataService();
