import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InIt from './components/init/init.js';
import Registration from './components/registration/registration.js';
import Header from './components/header/header.js';
import Account from './components/account/account.js';
import Balance from './components/balance/balance.js';
import Orders from './components/orders/orders.js';
import Password_change from './components/password_change/password_change.js';
import Settings from './components/settings/settings.js';

class App extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <Router>
        <div>
          <Header/>
          <Switch>
              <Route  path = "/login" component = {InIt}/>
              <Route  path = "/Registration" component = {Registration}/>
              <Route  path = "/account" component = {Account}/>
              <Route  path = "/balance" component = {Balance}/>
              <Route  path = "/orders" component = {Orders}/>
              <Route  path = "/password_change" component = {Password_change}/>
              <Route  path = "/settings" component = {Settings}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchTProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchTProps)(App);
