import express from 'express';
import { getComplaints, createComplaint, updateComplaint, deleteComplaint } from '../controllers/complaintController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/',        protect, getComplaints);
router.post('/',       protect, createComplaint);           // residents can submit
router.put('/:id',     protect, adminOnly, updateComplaint); // admin updates
router.delete('/:id',  protect, adminOnly, deleteComplaint);

export default router;
