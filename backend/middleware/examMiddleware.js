import mongoose from 'mongoose';
import Exam from '../models/examModel.js';
import ExamAttempt from '../models/examAttemptModel.js';
import Question from '../models/questionModel.js';

export const isExamCreator = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.examId)
      .select('createdBy')
      .lean();

    if (!exam) {
      return res.status(404).json({ 
        success: false, 
        message: "Exam not found" 
      });
    }

    if (exam.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: "You are not authorized to modify this exam" 
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const isExamActive = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.examId)
      .select('status startTime endTime')
      .lean();

    if (!exam) {
      return res.status(404).json({ 
        success: false, 
        message: "Exam not found" 
      });
    }

    const currentTime = new Date();
    if (exam.status !== 'published' || 
        currentTime < exam.startTime || 
        currentTime >= exam.endTime) {
      return res.status(403).json({ 
        success: false, 
        message: "Exam is not currently active" 
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const checkAttemptLimit = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.examId);
    
    if (exam.maxAttempts === 0) return next();

    // Count only COMPLETED attempts
    const completedAttempts = await ExamAttempt.countDocuments({
      examId: req.params.examId,
      studentId: req.user.id,
      isCompleted: true
    });

    if (completedAttempts >= exam.maxAttempts) {
      return res.status(403).json({
        success: false,
        message: "Maximum attempt limit reached"
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const isQuestionOwner = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionId)
      .populate('examId', 'createdBy');

    if (!question) {
      return res.status(404).json({ 
        success: false, 
        message: "Question not found" 
      });
    }

    if (question.examId.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: "You are not authorized to modify this question" 
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};