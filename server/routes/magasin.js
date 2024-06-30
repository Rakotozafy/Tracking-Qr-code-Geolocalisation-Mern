import express from 'express';
import { getMagasin, ajoutMagasin,getMagasins, deleteMagasin, updateMagasin } from '../controllers/magasin.js';
import magasin from '../models/Magasin.js';

const router = express.Router();

router.get('/', getMagasin);
router.get('/:id',getMagasins)
router.post('/', ajoutMagasin);
router.delete('/:id' , deleteMagasin);
router.put('/:id', updateMagasin);
export default router;
