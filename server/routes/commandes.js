import express from 'express';

import { getCommandes, getCommande, createCommande, updateCommande, deleteCommande } from '../controllers/commandes.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getCommandes);
router.get('/:id', getCommande);

router.post('/', auth, createCommande);

router.patch('/:id', auth, updateCommande)
// router.patch('/:id', auth , updateStatus)
router.delete('/:id',auth ,deleteCommande)
export default router;