export function length_balance_fetch_data_success(length_balance) {
  return {
    type: 'LENGTH_BALANCE_FETCH_DATA_SACCESS',
    length_balance
  }
}
export function length_balance_fetch_data(url, data) {
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(length_balance => dispatch(length_balance_fetch_data_success(length_balance)))
  }
}
