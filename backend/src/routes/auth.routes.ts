import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  registerValidationRules,
  loginValidationRules
} from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.route('/register')
  .post(registerValidationRules, registerUser);

router.route('/login')
  .post(loginValidationRules, loginUser);

// Protected routes
router.route('/profile')
  .get(protect, getCurrentUser);

export default router;