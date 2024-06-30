/*eslint-disable*/
import { combineReducers } from 'redux';

import commandes from './commandes';
import auth from './auth';
export const reducers = combineReducers({
    commandes,
    auth,

});
