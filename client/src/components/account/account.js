import React from 'react';
import use_styles from '../../jss/style';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { read_cookie } from 'sfcookies';
import { refrash_data_fetch_data } from '../../action/refrash_data_action.js';

class Account extends React.Component {

  refrash_data = () => {
    const cookie_key = 'Cookie';
    if (read_cookie(cookie_key) !== '') {
      let data = {
        user_id: read_cookie(cookie_key)
      }
      this.props.featchData_refrash_data('http://localhost:3001/refrash_data', data);
    }
  }

  componentDidMount() {
    this.refrash_data();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.refrash_data.length === 0) {
      this.refrash_data();
    }
  }

  render() {
    const { classes } = this.props;
    const { refrash_data } = this.props;
    return (
      <div className = {classes.account_window}>
        <div className = {classes.account_info}>
          <img className = {classes.main_photo} src = {refrash_data.photo}/>
          <div className = {classes.user_info_block}>
            <p className = {classes.user_info_el}>Имя: {refrash_data.first_name}</p>
            <p className = {classes.user_info_el}>Фамилия: {refrash_data.last_name}</p>
            <p className = {classes.user_info_el}>e-mail: {refrash_data.email}</p>
            <p className = {classes.user_info_el}>Баланс: {refrash_data.balance} рублей</p>
          </div>
        </div>
        <div className = {classes.user_button_block}>
          <Link to = 'settings' className = {classes.account_button}>Настройки аккаунта</Link>
          <Link to = 'password_change' className = {classes.account_button}>Изменение пароля</Link>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    refrash_data: state.refrash_data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    featchData_refrash_data: (url, data) => dispatch(refrash_data_fetch_data(url, data))
  };
};

export default withStyles(use_styles)(connect(mapStateToProps, mapDispatchToProps)(Account));
