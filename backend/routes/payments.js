import express from 'express';
import { getPayments, getPayment, createPayment, updatePayment, deletePayment } from '../controllers/paymentController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/',        protect, getPayments);
router.get('/:id',     protect, getPayment);
router.post('/',       protect, adminOnly, createPayment);
router.put('/:id',     protect, adminOnly, updatePayment);
router.delete('/:id',  protect, adminOnly, deletePayment);

export default router;
