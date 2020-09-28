import { combineReducers } from 'redux';
import { user } from './new_reduce.js';
import { auth } from './Auth_reduce.js';
import { pass_change } from './pass_change_reduce.js';
import { change_settings } from './change_settings_reduce.js';
import { refrash_data } from './refrash_data_reduce.js';
import { orders } from './orders_reduce.js';
import { balance } from './balance_reduce.js';
import { length_orders } from './length_orders_reduce.js';
import { length_balance } from './length_balance_reduce.js';

const root_reducer = combineReducers ({
  user,
  auth,
  pass_change,
  change_settings,
  refrash_data,
  orders,
  length_orders,
  length_balance,
  balance
});

export default root_reducer;
