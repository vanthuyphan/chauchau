const initialState = {
  user: {},
  token: '',
};

export function getUser(state) {
  return state.user;
}

export function getToken(state) {
  return state.token;
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_FETCHED':
      return Object.assign({}, state, {
        user: action.user, }
        );
    case 'LOGIN_DONE':
      console.log("Dine login", action.data)
      return Object.assign({}, state, {
        token: action.data,
      });
    case 'LOG_OUT':
      return Object.assign({}, state, {
        token: {},
        user: ''
      });
    default:
      return state;
  }
};
export default userReducer;
