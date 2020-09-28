export function orders_fetch_data_success(orders) {
  return {
    type: 'ORDERS_FETCH_DATA_SACCESS',
    orders
  }
}
export function orders_fetch_data(url, data) {
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(orders => dispatch(orders_fetch_data_success(orders)))
  }
}
