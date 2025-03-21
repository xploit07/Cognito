import express from 'express';
import {
  generateResult,
  getStudentResult,
  exportExamResults
} from '../controllers/resultController.js';
import {
  isFacultyOrAdmin
} from '../middleware/roleMiddleware.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Generate Results (Faculty/Admin only)
router.post(
  '/:examId/results/generate',
  userAuth,
  isFacultyOrAdmin,
  generateResult
);

// Get Results (Authenticated users)
router.get(
  '/:examId/results',
  userAuth,
  getStudentResult
);

// Export Results (Faculty/Admin only)
router.get(
  '/:examId/export-results',
  userAuth,
  isFacultyOrAdmin,
  exportExamResults
);

export default router;