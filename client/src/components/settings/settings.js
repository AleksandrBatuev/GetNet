import React from 'react';
import use_styles from '../../jss/style';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { read_cookie } from 'sfcookies';
import { change_settings_fetch_data } from '../../action/change_settings_action.js';
import { refrash_data_fetch_data } from '../../action/refrash_data_action.js';

class Settings extends React.Component {

  state = {
    first_name: '',
    last_name: '',
    photo: null
    }

  handle_user_input = event => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "first_name") {
      this.setState({first_name: value})
    }
    if (name === "last_name") {
      this.setState({last_name: value})
    }
  }

  handle_user_input_file = event => {
    if (event.target.files.length) {
      this.setState({photo: event.target.files[0]})
    }
  }

  change_settings_click = () => {
    const cookie_key = 'Cookie';
    if (this.state.first_name && this.state.last_name && this.state.photo && read_cookie(cookie_key) !== '') {
      let data = new FormData();
      data.append('photo', this.state.photo);
      data.append('user_id', read_cookie(cookie_key));
      data.append('first_name', this.state.first_name);
      data.append('last_name', this.state.last_name);
      let redata = {
        user_id: read_cookie(cookie_key)
      };
      if (read_cookie(cookie_key) !== '') {
        this.props.featchData_change_settings('http://localhost:3001/change_settings', data);
        this.props.featchData_refrash_data('http://localhost:3001/refrash_data', redata);
      }
      this.setState({first_name: ''});
      this.setState({last_name: ''});
      this.setState({photo: null});
    }
  }

  render() {
    const { classes } = this.props;
    const { first_name } = this.state;
    const { last_name } = this.state;
    const { change_settings } = this.props;
    return (
      <div className = {classes.registration_window}>
        <h3 className = {classes.authorization}>Настройки аккаунта</h3>
        <form>
          <input className = {classes.input} onChange = {this.handle_user_input} name = "first_name" value={first_name} placeholder = "Имя"/>
        </form>
        <form>
          <input className = {classes.input} onChange = {this.handle_user_input} name = "last_name" value={last_name} placeholder = "Фамилия"/>
        </form>
        <p className = {classes.set_p_photo}>Загрузить фото</p>
        <form>
          <input className = {classes.input_file}  onChange = {this.handle_user_input_file} type = "file" />
        </form>
        <Link to = '/settings' className = {classes.settings_button} onClick = {this.change_settings_click}>Внести изменения</Link>
        <p className = {classes.good_answer} >{change_settings.good_answer}</p>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    change_settings: state.change_settings
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    featchData_change_settings: (url, data, f_data) => dispatch(change_settings_fetch_data(url, data)),
    featchData_refrash_data: (url, redata) => dispatch(refrash_data_fetch_data(url, redata))
  };
};

export default withStyles(use_styles)(connect(mapStateToProps, mapDispatchToProps)(Settings));
