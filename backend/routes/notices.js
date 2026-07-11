import express from 'express';
import { getNotices, getNotice, createNotice, updateNotice, deleteNotice } from '../controllers/noticeController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/',          protect, getNotices);
router.get('/:id',       protect, getNotice);
router.post('/',         protect, adminOnly, createNotice);
router.put('/:id',       protect, adminOnly, updateNotice);
router.delete('/:id',    protect, adminOnly, deleteNotice);

export default router;
