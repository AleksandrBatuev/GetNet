import React from 'react';
import use_styles from '../../jss/style';
import css from '../../jss/style.css';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { read_cookie } from 'sfcookies';
import { orders_fetch_data } from '../../action/orders_action.js';
import { length_orders_fetch_data } from '../../action/length_orders_action.js';
import { Link } from 'react-router-dom';

class Orders extends React.Component {

  refrash_orders = () => {
    const cookie_key = 'Cookie';
    if (read_cookie(cookie_key) !== '') {
      let data = {
        user_id: read_cookie(cookie_key),
        page: "1"
      }
      this.props.featchData_orders('http://localhost:3001/orders', data);
    }
  }

  componentDidMount() {
    this.refrash_orders();
    const cookie_key = 'Cookie';
    let l_data = {
      user_id: read_cookie(cookie_key)
    }
    this.props.featchData_length_orders('http://localhost:3001/length_orders', l_data);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orders.length === 0) {
      this.refrash_orders();
    }
  }

  clik_change_page = (e) => {
    let page = e.target.id;
    const cookie_key = 'Cookie';
    let data = {
      user_id: read_cookie(cookie_key),
      page: page
    };
    this.props.featchData_orders('http://localhost:3001/orders', data);
  }

  render() {
    const { classes } = this.props;
    const { orders } = this.props;
    const { length_orders } = this.props;
    return (
      <div className = {classes.account_window}>
        <table className = {classes.table}>
          <tbody>
            <tr>
                <td>Компания</td>
                <td>Название</td>
                <td>Цена</td>
                <td>Статус</td>
            </tr>
            {orders.map((order, index) => {
              return (
                <tr key = {index}>
                  <td>{order.name_company}</td>
                  <td>{order.name_order}</td>
                  <td>{order.price}</td>
                  <td>{order.status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className = {classes.pag_button_block}>
          <Link to = '/orders' onClick = {this.clik_change_page} className = {this.props.classes.pag_button_fin} id = {1}>Начало</Link>
          {length_orders.map((e, i) => {
            return (
              <Link to = '/orders' key = {i} onClick = {this.clik_change_page} className = {this.props.classes.pag_button} id = {e}>{e}</Link>
            )
          })}
          <Link to = '/orders' onClick = {this.clik_change_page} className = {this.props.classes.pag_button_fin} id = {length_orders[length_orders.length - 1]}>Конец</Link>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    length_orders: state.length_orders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  featchData_orders: (url, data) => dispatch(orders_fetch_data(url, data)),
  featchData_length_orders: (url, l_data) => dispatch(length_orders_fetch_data(url, l_data))
  };
};

export default withStyles(use_styles)(connect(mapStateToProps, mapDispatchToProps)(Orders));
