/*eslint-disable*/
import * as actionTypes from '../constants/produitConstants'
import axios from 'axios'
import { UPDATE_PRODUIT } from 'redux/constants/produitConstants';

export const getProduits = () => async (dispatch) => {
    try {
        dispatch({type : actionTypes.GET_PRODUITS_REQUEST})
        const {data} = await axios.get('http://localhost:5000/produit')

        dispatch({
            type: actionTypes.GET_PRODUITS_SUCCESS,
            payload : data,
        })
    } catch (error) {
    dispatch({
        type : actionTypes.GET_PRODUITS_FAIL,
        payload: 
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
        
    }
};

export const getProduitDetails = (id) => async (dispatch) => {
    try {
        dispatch({type : actionTypes.GET_PRODUIT_DETAILS_REQUEST})
        const {data} = await axios.get(`http://localhost:5000/produit/${id}`)

        dispatch({
            type: actionTypes.GET_PRODUIT_DETAILS_SUCCESS,
            payload : data,
        })
    } catch (error) {
    dispatch({
        type : actionTypes.GET_PRODUITS_FAIL,
        payload: 
        error.response && error.message.data.message ? error.response.data.message : error.message,
    })
        
    }
};


export const removeProduitDetails = () => (dispatch) =>{
    dispatch({
        type : actionTypes.GET_PRODUIT_DETAILS_RESET
    })
}