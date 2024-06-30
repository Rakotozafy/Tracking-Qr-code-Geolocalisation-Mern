/*eslint-disable*/
import { AUTH_MAGASINIER } from '../constants/magasinierConstants';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH_MAGASINIER, data });

    router.push('/client');
  } catch (error) {
    console.log(error);
    alert('Adresse email ou mot de passe incorrect !')
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH_MAGASINIER, data });

    router.push('/client');
  } catch (error) {
    console.log(error);
    alert('Mot de passe incorrect !')
  }
};