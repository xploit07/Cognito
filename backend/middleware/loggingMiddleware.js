import ExamLog from '../models/examLogModel.js';
import ExamAttempt  from '../models/examAttemptModel.js';
import Exam from '../models/examModel.js';

export const logExamActivity = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const studentId = req.user.id;

    // For response submissions
    if (req.method === 'POST' && req.originalUrl.includes('/responses')) {
      const attempt = await ExamAttempt.findOne({
        examId,
        studentId,
        isActive: true
      });

      if (attempt) {
        await ExamLog.updateOne(
          { examId, studentId, attemptId: attempt._id },
          { $push: { 
            events: {
              type: 'answer',
              questionId: req.params.questionId,
              metadata: {
                selectedOptions: req.body.selectedOptions,
                timestamp: new Date()
              }
            }
          }}
        );
      }
    }

    next();
  } catch (error) {
    console.error('Logging failed:', error);
    next();
  }
};