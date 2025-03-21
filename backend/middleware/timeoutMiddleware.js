import ExamAttempt from "../models/examAttemptModel.js";
import Exam from "../models/examLogModel.js";

export const checkExamTimeout = async (req, res, next) => {
  try {
    const attempt = await ExamAttempt.findOne({
      examId: req.params.examId,
      studentId: req.user.id,
      isActive: true,
      isCompleted: false
    });

    if (!attempt) {
      return res.status(403).json({ 
        success: false, 
        message: "No active exam attempt found" 
      });
    }

    const elapsedMinutes = (Date.now() - attempt.startTime) / (1000 * 60);
    
    if (elapsedMinutes > attempt.duration) {
      await ExamAttempt.findByIdAndUpdate(attempt._id, {
        isActive: false,
        isCompleted: true
      });
      return res.status(403).json({ 
        success: false, 
        message: "Exam time expired" 
      });
    }

    // Adding remaining time to headers
    res.set('X-Remaining-Time', attempt.duration - elapsedMinutes);
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};