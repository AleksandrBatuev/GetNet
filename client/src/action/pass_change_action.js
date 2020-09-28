export function pass_change_fetch_data_success(pass_change) {
  return {
    type: 'PASS_CHANGE_FETCH_DATA_SACCESS',
    pass_change
  }
}
export function pass_change_fetch_data(url, data) {
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(pass_change => dispatch(pass_change_fetch_data_success(pass_change)))
  }
}
