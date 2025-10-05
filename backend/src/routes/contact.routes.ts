import express from 'express';
import {
  submitContactForm,
  getAllContactForms,
  getContactFormById,
  deleteContactForm,
  contactValidationRules
} from '../controllers/contact.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.route('/')
  .post(contactValidationRules, submitContactForm);

// Admin routes
router.route('/')
  .get(protect, admin, getAllContactForms);

router.route('/:id')
  .get(protect, admin, getContactFormById)
  .delete(protect, admin, deleteContactForm);

export default router;