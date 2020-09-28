export function length_orders_fetch_data_success(length_orders) {
  return {
    type: 'LENGTH_ORDERS_FETCH_DATA_SACCESS',
    length_orders
  }
}
export function length_orders_fetch_data(url, data) {
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(length_orders => dispatch(length_orders_fetch_data_success(length_orders)))
  }
}
