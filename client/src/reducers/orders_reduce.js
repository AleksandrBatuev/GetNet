export function orders(state_orders = [], action) {
  switch (action.type) {
    case 'ORDERS_FETCH_DATA_SACCESS':
      return action.orders;
    default:
      return state_orders;
  }
}
