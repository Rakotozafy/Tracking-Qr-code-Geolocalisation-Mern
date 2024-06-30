/*eslint-disable*/
import { START_LOADING,END_LOADING, CREATE, UPDATE, DELETE, FETCH_ALL, FETCH_COMMANDE } from '../constants/commandeConstants';
import * as api from '../api/index.js';
import { CART_RESET } from 'redux/constants/cartConstants';
// import { fetchCommande } from 'api';


export const getCommande = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchCommande(id);

    dispatch({ type: FETCH_COMMANDE, payload: { commande: data } });
  } catch (error) {
    console.log(error);
  }
};

//andrana

export const getCommandes = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchCommandes(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};


export const createCommande = (commande, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createCommande(commande);

    dispatch({ type: CREATE, payload: data });
    //mila jerena
    history.push('commande');

    dispatch({
      type: CART_RESET,
      payload: data,
    })
    localStorage.removeItem('cartItems')

  } catch (error) {
    console.log(error);
  }
};


export const updateStatus = (id, commande) => async (dispatch) => {
  try {
    const { data } = await api.updateCommande(id, commande);

    dispatch({ type: UPDATE, payload: data });
    return data.status
  } catch (error) {
    console.log(error);
  }
};

export const deleteCommande = (id) => async (dispatch) => {
  try {
    await await api.deleteCommande(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
