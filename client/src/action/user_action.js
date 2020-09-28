export function new_fetch_data_success(user) {
  return {
    type: 'NEW_FETCH_DATA_SACCESS',
    user
  }
}
export function new_fetch_data(url, data) {
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(user => dispatch(new_fetch_data_success(user)))
  }
}
