/*eslint-disable*/
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});


export const fetchCommande = (id) => API.get(`/commandes/${id}`);
export const fetchCommandes = (page) => API.get(`/commandes?page=${page}`);

export const createCommande = (newCommande) => API.post('/commandes', newCommande);
export const updateCommande = (id, updatedCommande) => API.patch(`/commandes/${id}`, updatedCommande);
export const deleteCommande = (id) => API.delete(`/commandes/${id}`);

export const status = (value, id) => API.post(`/commandes/${id}/updateStatus`, { value });


// Livraison
export const fetchLivraison = (id) => API.get(`/livraisons/${id}`);
export const fetchLivraisons = (page) => API.get(`/livraisons?page=${page}`);

export const createLivraison = (newLivraison) => API.post('/livraisons', newLivraison);
export const updateLivraison = (id, updatedLivraison) => API.patch(`/livraisons/${id}`, updatedLivraison);
export const deleteLivraison = (id) => API.delete(`/livraisons/${id}`);
export const updateProduit = (id,updatedProduit) => API.patch(`/produit/${id}`,updatedProduit)
//Magasinier authentification

export const signIn = (formData) => API.post('/magasinier/signin', formData);
export const signUp = (formData) => API.post('/magasinier/signup', formData);
