/*eslint-disable*/
import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/admin');

  } catch (error) {
    console.log({ error: 'Utilisateur non trouvé !' });
    alert('Adresse email ou mot de passe incorrect !')
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/admin');
  } catch (error) {
    console.log(error);

    alert('Mot de passe incorrect !')
  }
};
