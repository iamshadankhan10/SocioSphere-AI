import express from 'express';
import { signupUser, loginUser, getUserProfile, getUsers } from '../controllers/authController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/users', protect, adminOnly, getUsers);

export default router;
