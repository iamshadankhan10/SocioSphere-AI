import express from 'express';
import { getDashboardData } from '../controllers/dashboardController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, adminOnly, getDashboardData);

export default router;
