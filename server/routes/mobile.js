import express from 'express';

import {  getLivs,getLiv, ajoutMouvement, updateMouvement, updateMouvement1}  from '../controllers/mobile.js';

const router = express.Router();

//Mobile
router.get('/',getLivs)
router.get('/:id',getLiv)
router.post('/', ajoutMouvement)
router.patch('/:id',updateMouvement)

// router.put('/:id',updateMouvement1)


export default router;