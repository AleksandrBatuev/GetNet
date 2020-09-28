import React from 'react';
import use_styles from '../../jss/style';
import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import Button from '../button/button.js';
import { delete_cookie } from 'sfcookies';

class Header extends React.Component {

  clik_exit = () => {
    const cookie_key = 'Cookie';
    delete_cookie(cookie_key);
    window.location.assign('http://localhost:3000')
  }

  render() {
    const { classes } = this.props;
    if (window.location.href === 'http://localhost:3000/' ||
        window.location.href === 'http://localhost:3000/InIt' ||
        window.location.href === 'http://localhost:3000/Registration' ) {
      return (
        <div>
          <div className = {classes.Header}>
              <Link to = '/Registration' className = {classes.Header_button}>Регистрация</Link>
              <Link to = '/login' className = {classes.Header_button}>Авторизация</Link>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className = {classes.Header}>
            <Link to = '/account' className = {classes.Header_button}>Аккаунт</Link>
            <Link to = '/orders' className = {classes.Header_button}>Заказы</Link>
            <Link to = '/balance' className = {classes.Header_button}>Баланс</Link>
            <Button onClick = {this.clik_exit} className = {classes.exit_button}>Выход</Button>
          </div>
        </div>
      );
    }
  }
}

export default withStyles(use_styles)(Header);
