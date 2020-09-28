import React from 'react';
import use_styles from '../../jss/style';
import css from '../../jss/style.css';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { read_cookie } from 'sfcookies';
import { balance_fetch_data } from '../../action/balance_action.js';
import { length_balance_fetch_data } from '../../action/length_balance_action.js';
import { refrash_data_fetch_data } from '../../action/refrash_data_action.js';
import { Link } from 'react-router-dom';

class Balance extends React.Component {

  refrash_balance = () => {
    const cookie_key = 'Cookie';
    if (read_cookie(cookie_key) !== '') {
      let data = {
        user_id: read_cookie(cookie_key),
        page: "1"
      }
      this.props.featchData_balance('http://localhost:3001/balance', data);
      this.props.featchData_refrash_data('http://localhost:3001/refrash_data', data);
    }
  }

  componentDidMount() {
    this.refrash_balance();
    const cookie_key = 'Cookie';
    let l_data = {
      user_id: read_cookie(cookie_key)
    }
    this.props.featchData_length_balance('http://localhost:3001/length_balance', l_data);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.balance.length === 0) {
      this.refrash_balance();
    }
  }

  clik_change_page = (e) => {
    let page = e.target.id;
    const cookie_key = 'Cookie';
    let data = {
      user_id: read_cookie(cookie_key),
      page: page
    };
    this.props.featchData_balance('http://localhost:3001/balance', data);
  }

  render() {
    const { classes } = this.props;
    const { refrash_data } = this.props;
    const { balance } = this.props;
    const { length_balance } = this.props;
    return (
      <div className = {classes.account_window}>
        <p className = {classes.balance_info}>Баланс: {refrash_data.balance} рублей</p>
        <table className = {classes.table}>
          <tbody>
            <tr>
                <td>Операия</td>
                <td>Изменение баланса</td>
                <td>Статус</td>
            </tr>
            {balance.map((bal, index) => {
              return (
                <tr key = {index}>
                  <td>{bal.name_balance}</td>
                  <td>{bal.price_change}</td>
                  <td>{bal.status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className = {classes.pag_button_block}>
          <Link to = '/balance' onClick = {this.clik_change_page} className = {this.props.classes.pag_button_fin} id = {1}>Начало</Link>
          {length_balance.map((e, i) => {
            return (
              <Link to = '/balance' key = {i} onClick = {this.clik_change_page} className = {this.props.classes.pag_button} id = {e}>{e}</Link>
            )
          })}
          <Link to = '/balance' onClick = {this.clik_change_page} className = {this.props.classes.pag_button_fin} id = {length_balance[length_balance.length - 1]}>Конец</Link>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    balance: state.balance,
    length_balance: state.length_balance,
    refrash_data: state.refrash_data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  featchData_balance: (url, data) => dispatch(balance_fetch_data(url, data)),
  featchData_length_balance: (url, l_data) => dispatch(length_balance_fetch_data(url, l_data)),
  featchData_refrash_data: (url, data) => dispatch(refrash_data_fetch_data(url, data))
  };
};

export default withStyles(use_styles)(connect(mapStateToProps, mapDispatchToProps)(Balance));
