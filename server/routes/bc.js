import express from 'express';
import { getBc , ajoutBc, deleteBc,updateBc } from '../controllers/bc.js';

const router = express.Router();


router.get('/', getBc);
router.post('/', ajoutBc);
router.delete('/:id' , deleteBc);
router.put('/:id', updateBc);
export default router;
