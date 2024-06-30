import express from 'express';
import { getAdmin , ajoutAdmin, deleteAdmin,updateAdmin ,getAdminById } from '../controllers/admin.js';
const router = express.Router();


router.get('/', getAdmin);
router.get('/:id',getAdminById);
router.post('/', ajoutAdmin);
router.delete('/:id' , deleteAdmin);
router.put('/:id', updateAdmin);
export default router;
