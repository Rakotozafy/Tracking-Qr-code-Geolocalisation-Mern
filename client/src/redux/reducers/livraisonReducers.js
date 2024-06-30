/*eslint-disable*/
import { CREATE_LIVRAISON, UPDATE_LIVRAISON, DELETE_LIVRAISON ,FETCH_LIVRAISON, FETCH_ALL_LIVRAISON } from '../constants/livraisonConstants';

export const livraisons = (state = { isLoading: true, livraisons: [] }, action) => {
  switch (action.type) {
    case 'START':
      return { ...state, isLoading: true };
    case 'END':
      return { ...state, isLoading: false };
    case FETCH_ALL_LIVRAISON:
      return {
        ...state,
        livraisons: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };


    case FETCH_LIVRAISON:
      return { ...state, livraison: action.payload.livraison };

    case CREATE_LIVRAISON:
      return { ...state, livraisons: [...state.livraisons, action.payload] };
    case UPDATE_LIVRAISON:
      return { ...state, livraisons: state.livraisons.map((livraison) => (livraison._id === action.payload._id ? action.payload : livraison)) };
    case DELETE_LIVRAISON:
      return { ...state, livraisons: state.livraisons.filter((livraison) => livraison._id !== action.payload) };
    default:
      return state;
  }
};

