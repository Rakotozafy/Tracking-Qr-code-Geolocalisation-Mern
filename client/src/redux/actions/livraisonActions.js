/*eslint-disable*/
import { START, END, CREATE_LIVRAISON, UPDATE_LIVRAISON, DELETE_LIVRAISON, FETCH_ALL_LIVRAISON, FETCH_LIVRAISON } from '../constants/livraisonConstants';
import * as api from '../api/index.js';
import { CART_RESET } from 'redux/constants/cartConstants';
import { fetchLivraison } from 'api';


export const getLivraison = (id) => async (dispatch) => {
  try {
    dispatch({ type: START });

    const { data } = await api.fetchLivraison(id);

    dispatch({ type: FETCH_LIVRAISON, payload: { livraison: data } });
    dispatch({ type: END });
    
  } catch (error) {
    console.log(error);
  }
};

//andrana

export const getLivraisons = (page) => async (dispatch) => {
  try {
    dispatch({ type: START });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchLivraisons(page);

    dispatch({ type: FETCH_ALL_LIVRAISON, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END });
  } catch (error) {
    console.log(error);
  }
};


export const createLivraison = (livraison, history) => async (dispatch) => {
  try {
    dispatch({ type: START });
    const { data } = await api.createLivraison(livraison);

    dispatch({ type: CREATE_LIVRAISON, payload: data });

    history.push(`/admin/livraisonScreen/${data._id}`)

    dispatch({
      type: CART_RESET,
      payload: data,
    })
    localStorage.removeItem('cartItems')

  } catch (error) {
    console.log(error);
  }
};


export const updateLivraison = (id, livraison) => async (dispatch) => {
  try {
    const { data } = await api.updateLivraison(id, livraison);

    dispatch({ type: UPDATE_LIVRAISON, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteLivraison = (id) => async (dispatch) => {
  try {
    await await api.deleteLivraison(id);

    dispatch({ type: DELETE_LIVRAISON, payload: id });
  } catch (error) {
    console.log(error);
  }
};
