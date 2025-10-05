import express from 'express';
import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
  getAllServices,
  createService,
  updateService,
  deleteService
} from '../controllers/data.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = express.Router();

// Testimonial routes
router.route('/testimonials')
  .get(getAllTestimonials)
  .post(protect, admin, createTestimonial);

router.route('/testimonials/:id')
  .put(protect, admin, updateTestimonial)
  .delete(protect, admin, deleteTestimonial);

// Client routes
router.route('/clients')
  .get(getAllClients)
  .post(protect, admin, createClient);

router.route('/clients/:id')
  .put(protect, admin, updateClient)
  .delete(protect, admin, deleteClient);

// Service routes
router.route('/services')
  .get(getAllServices)
  .post(protect, admin, createService);

router.route('/services/:id')
  .put(protect, admin, updateService)
  .delete(protect, admin, deleteService);

export default router;