export function balance_fetch_data_success(balance) {
  return {
    type: 'BALANCE_FETCH_DATA_SACCESS',
    balance
  }
}
export function balance_fetch_data(url, data) {
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(balance => dispatch(balance_fetch_data_success(balance)))
  }
}
