/*eslint-disable*/
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'

//Reducer
import { cartReducer } from "./reducers/cartReducers";
import { getProduitDetailsReducer, getProduitsReducer} from "./reducers/produitReducers";
import { commandes } from './reducers/commandeReducers';
import { livraisons } from "./reducers/livraisonReducers";
import auth from 'reducers/auth'
import { magasinierReducers } from "./reducers/magasinierReducers";
const reducer = combineReducers({
    cart: cartReducer,
    getProduits: getProduitsReducer,
    getProduitDetails: getProduitDetailsReducer,
    commandes,
    livraisons,
    auth,
    magasinierReducers,



})

const middleware = [thunk]


const cartFromLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []

const INITIAL_STATE = {
    cart: {
        cartItems: cartFromLocalStorage
    }
}

const store = createStore(
    reducer,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
