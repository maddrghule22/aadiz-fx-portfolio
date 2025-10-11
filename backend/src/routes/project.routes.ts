import express from 'express';
import {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  getProjectsByCategory,
  getProjectCount,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/project.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.route('/')
  .get(getAllProjects);

router.route('/featured')
  .get(getFeaturedProjects);

router.route('/count')
  .get(getProjectCount);

router.route('/category/:category')
  .get(getProjectsByCategory);

router.route('/:id')
  .get(getProjectById);

// Admin routes
router.route('/')
  .post(protect, admin, createProject);

router.route('/:id')
  .put(protect, admin, updateProject)
  .delete(protect, admin, deleteProject);

export default router;