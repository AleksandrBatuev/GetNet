import React from 'react';
import use_styles from '../../jss/style';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import Button from '../button/button.js';
import { new_fetch_data } from '../../action/user_action.js';
import md5 from 'md5';

class Registration extends React.Component {

  state = {
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    error_valid: '',
    email_valid: false,
    password_valid: false,
    good_answer: ''

  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user && this.props.user.answer) {
      this.setState({error_valid: this.props.user.answer});
    } else if (prevProps.user !== this.props.user && this.props.user.good_answer) {
      this.setState({good_answer: this.props.user.good_answer});
    }
  }

    handle_user_input = event => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({[name]: value},
                () => { this.validate_field(name, value) });
    }

    validate_field(fieldName, value) {
      let fielf_error_valid = this.state.error_valid;
      let email_valid = this.state.email_valid;
      let password_valid = this.state.password_valid;
      switch(fieldName) {
          case 'email':
            email_valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fielf_error_valid = email_valid ? '' : ' Некорректный email';
            break;
          case 'password_confirm':
            password_valid = this.state.password_confirm === this.state.password;
            fielf_error_valid = password_valid ? '': 'Пароли не совпадают';
            break;
            case 'password':
              password_valid = this.state.password_confirm === this.state.password;
              fielf_error_valid = password_valid ? '': 'Пароли не совпадают';
              break;
          default:
            break;
        }
        this.setState({error_valid: fielf_error_valid, email_valid: email_valid, password_valid: password_valid});
    }

  Registration_click = () => {
    if (this.state.email && this.state.password && !this.state.error_valid) {
      const data = {
        email: this.state.email,
        password: md5(this.state.password),
        password_confirm: md5(this.state.password_confirm),
        first_name: this.state.first_name,
        last_name: this.state.last_name
      };
      this.props.featchData_new('http://localhost:3001/new_user', data);
      this.setState({email: ''});
      this.setState({password: ''});
      this.setState({password_confirm: ''});
      this.setState({first_name: ''});
      this.setState({last_name: ''});
    }
  };

  render() {
    const { classes } = this.props;
    const { email } = this.state;
    const { password } = this.state;
    const { password_confirm } = this.state;
    const { error_valid } = this.state;
    const { good_answer } = this.state;
    const { first_name } = this.state;
    const { last_name } = this.state;
    return (
        <div className = {classes.registration_window}>
          <p className = {classes.authorization}>
            Регистрация
          </p>
          <form>
            <input className = {classes.input} onChange = {this.handle_user_input} name = "email" value={email} placeholder = "Введите e-mail"/>
          </form>
          <form>
            <input className = {classes.input} type = "password" name = "password" onChange = {this.handle_user_input} value={password} placeholder = "Введите пароль"/>
          </form>
          <form>
            <input className = {classes.input} type = "password" name = "password_confirm" onChange = {this.handle_user_input} value={password_confirm} placeholder = "Подтверждение пароля"/>
          </form>
          <form>
            <input className = {classes.input}  name = "first_name" onChange = {this.handle_user_input} value={first_name} placeholder = "Введите Имя"/>
          </form>
          <form>
            <input className = {classes.input}  name = "last_name" onChange = {this.handle_user_input} value={last_name} placeholder = "Введите Фамилию"/>
          </form>
          <Button className = {classes.reg_button} onClick = {this.Registration_click} >Регистрация</Button>
          <p className = {classes.error_valid} >{error_valid}</p>
          <p className = {classes.good_answer} >{good_answer}</p>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    featchData_new: (url, data) => dispatch(new_fetch_data(url, data))
  };
};

export default withStyles(use_styles)(connect(mapStateToProps, mapDispatchToProps)(Registration));
