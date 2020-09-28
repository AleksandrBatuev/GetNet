export function change_settings_fetch_data_success(change_settings) {
  return {
    type: 'CHANGE_SETTINGS_FETCH_DATA_SACCESS',
    change_settings
  }
}
export function change_settings_fetch_data(url, data) {
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      body: data
    })
    .then(res => res.json())
    .then(change_settings => dispatch(change_settings_fetch_data_success(change_settings)))
  }
}
