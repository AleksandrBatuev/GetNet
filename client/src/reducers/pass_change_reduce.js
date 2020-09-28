export function pass_change(state_pass_change = [], action) {
  switch (action.type) {
    case 'PASS_CHANGE_FETCH_DATA_SACCESS':
      return action.pass_change;
    default:
      return state_pass_change;
  }
}
