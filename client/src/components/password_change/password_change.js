import React from 'react';
import use_styles from '../../jss/style';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import { pass_change_fetch_data } from '../../action/pass_change_action.js';
import { read_cookie } from 'sfcookies';

class Password_change extends React.Component {

  state = {
    password: '',
    new_password: '',
    new_password_confirm: '',
    error_valid: '',
    error_valid_new_pass: '',
    new_pass_valid: false,
    password_valid: false,
    good_anser: ''
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pass_change !== this.props.pass_change && this.props.pass_change.answer) {
      this.setState({good_answer: ''});
      this.setState({error_valid: this.props.pass_change.answer});
    } else if (prevProps.pass_change !== this.props.pass_change && this.props.pass_change.good_answer) {
      this.setState({good_answer: this.props.pass_change.good_answer});
    }
  }

  handle_user_input = event => {
    const name = event.target.name;
    const value =event.target.value;
    this.setState({[name]: value},
              () => { this.validate_field(name, value) });
  }

  validate_field(fieldName, value) {
    let fielf_error_valid_new_pass = this.state.error_valid_new_pass;
    let new_password_valid = this.state.new_pass_valid;
    let fielf_error_valid = this.state.error_valid;
    let password_valid = this.state.password_valid;
    switch(fieldName) {
        case 'new_password':
          new_password_valid = this.state.new_password !== this.state.password;
          fielf_error_valid_new_pass = new_password_valid ? '': 'Новый пароль должен отличаться от старого';
          break;
        case 'new_password_confirm':
          password_valid = this.state.new_password_confirm === this.state.new_password;
          fielf_error_valid = password_valid ? '': 'Пароли не совпадают';
          break;
        case 'new_password':
          password_valid = this.state.new_password_confirm === this.state.new_password;
          fielf_error_valid = password_valid ? '': 'Пароли не совпадают';
          break;
        default:
          break;
      }
      this.setState({error_valid: fielf_error_valid, password_valid: password_valid,
                      error_valid_new_pass: fielf_error_valid_new_pass, new_pass_valid: new_password_valid});
  }

  Pass_change_click = () => {
    const cookie_key = 'Cookie';
    if (this.state.new_password && this.state.new_password_confirm && !this.state.error_valid && read_cookie(cookie_key) !== '') {
      const data = {
        auth_user_id: read_cookie(cookie_key),
        password: md5(this.state.password),
        new_password: md5(this.state.new_password)
      };
      this.props.featchData_pass_change('http://localhost:3001/pass_change', data);
      this.setState({password: ''});
      this.setState({new_password: ''});
      this.setState({new_password_confirm: ''});
    }
  };

  render() {
    const { classes } = this.props;
    const { password } = this.state;
    const { new_password } = this.state;
    const { new_password_confirm } = this.state;
    const { error_valid } = this.state;
    const { error_valid_new_pass } = this.state;
    const { good_answer } = this.state
    return (
      <div className = {classes.pass_cange_window}>
        <h3 className = {classes.authorization}>Изменение пароля</h3>
        <form>
          <input className = {classes.input} type = "password" name = "password" onChange = {this.handle_user_input} value={password} placeholder = "Старый пароль"/>
        </form>
        <form>
          <input className = {classes.input} type = "password" name = "new_password" onChange = {this.handle_user_input} value={new_password} placeholder = "Новый пароль"/>
        </form>
        <form>
          <input className = {classes.input} type = "password" name = "new_password_confirm" onChange = {this.handle_user_input} value={new_password_confirm} placeholder = "Подтвердите пароль"/>
        </form>
        <Link to = 'password_change' className = {classes.settings_button} onClick = {this.Pass_change_click}>Поменять пароль</Link>
        <p className = {classes.error_valid} >{error_valid_new_pass}</p>
        <p className = {classes.error_valid} >{error_valid}</p>
        <p className = {classes.good_answer} >{good_answer}</p>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    pass_change: state.pass_change
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    featchData_pass_change: (url, data) => dispatch(pass_change_fetch_data(url, data))
  };
};

export default withStyles(use_styles)(connect(mapStateToProps, mapDispatchToProps)(Password_change));
