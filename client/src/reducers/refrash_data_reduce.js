export function refrash_data(state_refrash_data = [], action) {
  switch (action.type) {
    case 'REFRASH_DATA_FETCH_DATA_SACCESS':
      return action.refrash_data;
    default:
      return state_refrash_data;
  }
}
