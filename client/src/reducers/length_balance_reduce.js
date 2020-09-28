export function length_balance(state_length_balance = [], action) {
  switch (action.type) {
    case 'LENGTH_BALANCE_FETCH_DATA_SACCESS':
      return action.length_balance;
    default:
      return state_length_balance;
  }
}
