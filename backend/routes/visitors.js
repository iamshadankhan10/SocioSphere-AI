import express from 'express';
import { getVisitors, createVisitor, updateVisitor, deleteVisitor } from '../controllers/visitorController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/',        protect, adminOnly, getVisitors);
router.post('/',       protect, adminOnly, createVisitor);
router.put('/:id',     protect, adminOnly, updateVisitor);
router.delete('/:id',  protect, adminOnly, deleteVisitor);

export default router;
