import express from 'express';
import { getExamLogs } from '../controllers/examLogController.js';
import userAuth from '../middleware/userAuth.js';
import { isFacultyOrAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Get paginated exam logs with filters
router.get('/:examId/logs', 
  userAuth,
  isFacultyOrAdmin,
  getExamLogs
);
// Get individual student log
router.get('/:examId/students/:studentId/logs', 
  userAuth,
  isFacultyOrAdmin,
  (req, res) => {
    req.query.studentId = req.params.studentId;
    return getExamLogs(req, res);
  }
);
export default router;