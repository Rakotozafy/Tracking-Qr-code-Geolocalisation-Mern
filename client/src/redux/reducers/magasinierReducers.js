/*eslint-disable*/
import * as actionType from '../constants/magasinierConstants'

export const  magasinierReducers = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH_MAGASINIER:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT_MAGASINIER:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

