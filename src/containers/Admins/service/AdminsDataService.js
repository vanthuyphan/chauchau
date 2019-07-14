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
  addClient(objUser) {
    return axios.post(USER_API_URL + '/api/register',
    // {
    //   data: objUser 
    // }
    // {
    //   "email": "kin.quang1992@gmail.com",
    //   "phoneNumber": "+1234567890",
    //   "enabled": true,
    //   "username": "nhukom",
    //   "firstName" : "kinquang",
    //   "lastName" : "nhikom"
    // }
    objUser
      ) ;
  }
}
export default new UsersDataService();
