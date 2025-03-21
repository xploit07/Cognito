import express from 'express';
import { getExamAnalytics } from '../controllers/analyticsController.js';
import userAuth from '../middleware/userAuth.js';
import { isFacultyOrAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/:examId/analytics',
  userAuth,
  isFacultyOrAdmin,
  getExamAnalytics //to be created
);

export default router;