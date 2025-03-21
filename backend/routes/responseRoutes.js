import express from 'express';
import {
  submitResponse,
  gradeResponse
} from '../controllers/responseController.js';
import {
  isStudent,
  isFacultyOrAdmin
} from '../middleware/roleMiddleware.js';
import userAuth from '../middleware/userAuth.js';
import {
  isExamActive
} from '../middleware/examMiddleware.js';
import { checkExamTimeout } from '../middleware/timeoutMiddleware.js';
import { logExamActivity } from '../middleware/loggingMiddleware.js';

const router = express.Router();

// Submit Response (Student + Active exam + Attempt limit check)
router.post(
  '/:examId/questions/:questionId/responses',
  userAuth,
  isStudent,
  isExamActive,
  checkExamTimeout,
  logExamActivity,
  submitResponse
);

// Grade Response (Faculty/Admin only)
router.put(
  '/:responseId/grade',
  userAuth,
  isFacultyOrAdmin,
  gradeResponse
);

export default router;