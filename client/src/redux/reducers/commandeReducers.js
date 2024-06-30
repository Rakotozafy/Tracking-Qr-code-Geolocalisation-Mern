/*eslint-disable*/
import { CREATE, UPDATE, DELETE, FETCH_ALL, FETCH_COMMANDE ,STATUS } from '../constants/commandeConstants';

export const commandes = (state = { isLoading: true, commandes: [] }, action) => {
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
    case STATUS:
      return {
        ...state, commandes: state.commandes.map((commande) => {
          if (commande._id == +action.payload._id) {
            return action.payload;
          }
          return commande;
        }),
      };

    case FETCH_COMMANDE:
      return { ...state, commande: action.payload.commande };

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


