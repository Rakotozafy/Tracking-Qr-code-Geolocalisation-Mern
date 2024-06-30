import express from 'express';

import { getCommandes, getCommandesBySearch, getCommandesByCreator, getCommande, createCommande, updateCommande, likeCommande, commentCommande, deleteCommande } from '../controllers/commandes.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator', getCommandesByCreator);
router.get('/search', getCommandesBySearch);
router.get('/', getCommandes);
router.get('/:id', getCommande);

router.post('/', auth,  createCommande);
router.patch('/:id', auth, updateCommande);
router.delete('/:id', auth, deleteCommande);
router.patch('/:id/likeCommande', auth, likeCommande);
router.post('/:id/commentCommande', commentCommande);

export default router;