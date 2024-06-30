/*eslint-disable*/
import * as actionTypes from '../constants/cartConstants'
import axios from 'axios'
export const addToCart = (id, qte) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:5000/produit/${id}`)

    dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
            produit: data._id,
            ref_prod: data.ref_prod,
            nom_prod: data.nom_prod,
            type_prod: data.type_prod,
            unite_prod: data.unite_prod,
            etat_stock: data.etat_stock,
            qte,
        }
    })
localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch , getState)=> {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload : id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}