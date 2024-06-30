import express from 'express';
import { getMagasinier,getMagasiniers , ajoutMagasinier, deleteMagasinier, updateMagasinier, signin, singup } from '../controllers/magasinier.js';

const router = express.Router();

router.get('/', getMagasinier);
router.get('/:id', getMagasiniers)
router.post('/', ajoutMagasinier);
router.delete('/:id' , deleteMagasinier);
router.post("/signin", signin);
router.post("/signup", singup)
router.put('/:id', updateMagasinier);
export default router;
