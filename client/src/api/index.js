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
export const fetchCommandesByCreator = (name) => API.get(`/commandes/creator?name=${name}`);
export const fetchCommandesBySearch = (searchQuery) => API.get(`/commandes/search?searchQuery=${searchQuery.search || 'none'}&produit=${searchQuery.produit}`);
export const createCommande = (newCommande) => API.post('/commandes', newCommande);
export const likeCommande = (id) => API.patch(`/commandes/${id}/likeCommande`);
export const comment = (value, id) => API.post(`/commandes/${id}/commentCommande`, { value });
export const updateCommande = (id, updatedCommande) => API.patch(`/commandes/${id}`, updatedCommande);
export const deleteCommande = (id) => API.delete(`/commandes/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

