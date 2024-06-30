import express from 'express';
import { getProduit, ajoutProduit, deleteProduit, updateProduit } from '../controllers/produit.js';
import produit from '../models/Produit.js';

const router = express.Router();
// Ecommerce
import {getAllProduits,getProduitById} from '../controllers/produitControllers.js'

router.get("/", getAllProduits)
router.get("/:id", getProduitById)

// Fin

router.get('/', getProduit);
router.post('/', ajoutProduit);
router.delete('/:id' , deleteProduit);
router.put('/:id', updateProduit);
export default router;