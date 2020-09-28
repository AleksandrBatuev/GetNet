export function auth_fetch_data_success(auth) {
  return {
    type: 'AUTH_FETCH_DATA_SACCESS',
    auth
  }
}
export function auth_fetch_data(url, data) {
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(auth => dispatch(auth_fetch_data_success(auth)))
  }
}
