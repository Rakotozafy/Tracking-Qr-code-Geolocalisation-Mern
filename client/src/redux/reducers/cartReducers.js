/*eslint-disable*/
import * as actionTypes from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            const item = action.payload
            const existItem = state.cartItems.find((x) => x.produit === item.produit)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.produit === existItem.produit ? item : x
                    ),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.produit !== action.payload),
            }
        case actionTypes.CART_RESET:
            return {
                ...state,
                cartItems: [],
            }
        default:
            return state
    }
}