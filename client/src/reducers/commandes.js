/*eslint-disable*/
import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_COMMANDE, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, commandes: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        commandes: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
      return { ...state, commandes: action.payload.data };
    case FETCH_COMMANDE:
      return { ...state, commande: action.payload.commande };
    case LIKE:
      return { ...state, commandes: state.commandes.map((commande) => (commande._id === action.payload._id ? action.payload : commande)) };
    case COMMENT:
      return {
        ...state,
        commandes: state.commandes.map((commande) => {
          if (commande._id == +action.payload._id) {
            return action.payload;
          }
          return commande;
        }),
      };
    case CREATE:
      return { ...state, commandes: [...state.commandes, action.payload] };
    case UPDATE:
      return { ...state, commandes: state.commandes.map((commande) => (commande._id === action.payload._id ? action.payload : commande)) };
    case DELETE:
      return { ...state, commandes: state.commandes.filter((commande) => commande._id !== action.payload) };
    default:
      return state;
  }
};

