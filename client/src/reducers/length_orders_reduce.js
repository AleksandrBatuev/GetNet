export function length_orders(state_length_orders = [], action) {
  switch (action.type) {
    case 'LENGTH_ORDERS_FETCH_DATA_SACCESS':
      return action.length_orders;
    default:
      return state_length_orders;
  }
}
