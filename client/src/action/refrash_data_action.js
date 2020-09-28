export function refrash_data_fetch_data_success(refrash_data) {
  return {
    type: 'REFRASH_DATA_FETCH_DATA_SACCESS',
    refrash_data
  }
}
export function refrash_data_fetch_data(url, data) {
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(refrash_data => dispatch(refrash_data_fetch_data_success(refrash_data)))
  }
}
