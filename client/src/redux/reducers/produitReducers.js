/*eslint-disable*/
import * as actionTypes from '../constants/produitConstants'

export const getProduitsReducer = (state = { produits: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUITS_REQUEST:
            return {
                loading: true,
                produits: [],
            }
        case actionTypes.GET_PRODUITS_SUCCESS:
            return {
                loading: false,
                produits: action.payload,

            }
        case actionTypes.GET_PRODUITS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
};

export const getProduitDetailsReducer = (state = { produit: {} }, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUIT_DETAILS_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.GET_PRODUIT_DETAILS_SUCCESS:
            return {
                loading: false,
                produit: action.payload,
            }
        case actionTypes.GET_PRODUIT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case actionTypes.GET_PRODUIT_DETAILS_RESET:
            return {
                product: {},
            }
        default:
            return state
    }
}
