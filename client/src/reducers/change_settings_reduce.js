export function change_settings(state_change_settings = [], action) {
  switch (action.type) {
    case 'CHANGE_SETTINGS_FETCH_DATA_SACCESS':
      return action.change_settings;
    default:
      return state_change_settings;
  }
}
