import express from 'express';

import { getBoncommandes, getBoncommandeBySearch, getBoncommandeByCreator, getBoncommande, createBoncommande, updateBoncommande, likeBoncommande, commentBoncommande, deleteBoncommande } from '../controllers/boncommande.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator', getBoncommandeByCreator);
router.get('/search', getBoncommandeBySearch);
router.get('/', getBoncommandes);
router.get('/:id', getBoncommande);

router.post('/', auth,  createBoncommande);
router.patch('/:id', auth, updateBoncommande);
router.delete('/:id', auth, deleteBoncommande);
router.patch('/:id/likeBoncommande', auth, likeBoncommande);
router.post('/:id/commentBoncommande', commentBoncommande);

export default router;