import React from 'react';
import use_styles from '../../jss/style';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { auth_fetch_data } from '../../action/auth_action.js';
import Button from '../button/button.js';
import md5 from 'md5';
import { bake_cookie } from 'sfcookies';

class InIt extends React.Component {

  state = {
    email: '',
    password: '',
    error_valid: '',
    email_valid: false
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth !== this.props.auth && this.props.auth.answer) {
      this.setState({error_valid: this.props.auth.answer});
    } else if (prevProps.auth !== this.props.auth && this.props.auth) {
      const cookie_key = 'Cookie';
      bake_cookie(cookie_key, this.props.auth.auth_user_id);
      window.location.assign('http://localhost:3000/account');
    } else if (prevProps.auth !== this.props.auth && this.props.auth === false) {
      this.setState({error_valid: 'Подтвердите аккаунт'});
    }
  }

  Authorization_click = () => {
    if (this.state.email && this.state.password && !this.state.error_valid) {
      const data = {
        email: this.state.email,
        password: md5(this.state.password)
      };
      this.props.featchData_auth('http://localhost:3001/auth_user', data);
      this.setState({email: ''});
      this.setState({password: ''});
    }
  };

  handle_user_input = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value},
              () => { this.validate_field(name, value) });
  }

  validate_field(fieldName, value) {
    let fielf_error_valid = this.state.error_valid;
    let email_valid = this.state.email_valid;
    switch(fieldName) {
        case 'email':
          email_valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fielf_error_valid = email_valid ? '' : ' Некорректный email';
          break;
        default:
          break;
      }
      this.setState({error_valid: fielf_error_valid, email_valid: email_valid});
  }

  render() {
    const { classes } = this.props;
    const { email } = this.state;
    const { password } = this.state;
    const { error_valid } = this.state;
    const { link } = this.state
    return (
        <div className = {classes.authorization_window}>
          <p className = {classes.authorization}>
            Авторизация
          </p>
          <form>
            <input className = {classes.input} onChange = {this.handle_user_input} name = "email" value={email} placeholder = "e-mail"/>
          </form>
          <form>
            <input className = {classes.input} type = "password" name = "password" onChange = {this.handle_user_input} value={password} placeholder = "Пароль"/>
          </form>
          <Button className = {classes.reg_button} onClick = {this.Authorization_click}>Вход</Button>
          <p className = {classes.error_valid} >{error_valid}</p>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    featchData_auth: (url, data) => dispatch(auth_fetch_data(url, data))
  };
};

export default withStyles(use_styles)(connect(mapStateToProps, mapDispatchToProps)(InIt));
