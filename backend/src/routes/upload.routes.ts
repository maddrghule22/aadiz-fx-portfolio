import express from 'express';
import {
  uploadSingleFile,
  uploadMultipleFiles,
  serveFile
} from '../controllers/upload.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = express.Router();

// Admin routes for uploading files
router.route('/single')
  .post(protect, admin, uploadSingleFile);

router.route('/multiple')
  .post(protect, admin, uploadMultipleFiles);

// Public route for serving files
router.route('/:filename')
  .get(serveFile);

export default router;