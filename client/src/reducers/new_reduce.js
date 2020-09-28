export function user(state_user = [], action) {
  switch (action.type) {
    case 'NEW_FETCH_DATA_SACCESS':
      return action.user;
    default:
      return state_user;
  }
}
