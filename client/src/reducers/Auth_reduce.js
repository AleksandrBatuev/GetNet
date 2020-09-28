export function auth(state_auth = [], action) {
  switch (action.type) {
    case 'AUTH_FETCH_DATA_SACCESS':
      return action.auth;
    default:
      return state_auth;
  }
}
