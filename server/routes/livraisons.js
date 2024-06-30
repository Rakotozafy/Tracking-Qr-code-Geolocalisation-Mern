import express from 'express';

import { getLivraisons, getLivraison, createLivraison, updateLivraison, deleteLivraison } from '../controllers/livraisons.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getLivraisons);
router.get('/:id', getLivraison);

router.post('/',  createLivraison);

router.put('/:id',  updateLivraison)

router.delete('/:id',deleteLivraison)
export default router;