import express from 'express';

import { getMouvements, getMouvement, createMouvement, updateMouvement, deleteMouvement } from '../controllers/mouvements.js';

const router = express.Router();

router.get('/', getMouvements);
router.get('/:id', getMouvement);

router.post('/',  createMouvement);

router.patch('/:id',  updateMouvement)

router.delete('/:id',deleteMouvement)
export default router;