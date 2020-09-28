export function balance(state_balance = [], action) {
  switch (action.type) {
    case 'BALANCE_FETCH_DATA_SACCESS':
      return action.balance;
    default:
      return state_balance;
  }
}
