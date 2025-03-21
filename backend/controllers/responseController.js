import Response from '../models/responseModel.js';
import Question from '../models/questionModel.js';
import Result from '../models/resultModel.js';
import ExamAttempt from '../models/examAttemptModel.js';
import ExamLog from '../models/examLogModel.js';
import { updateExamAnalytics } from '../controllers/analyticsController.js';
import examModel from '../models/examModel.js';

// Helper function for array comparison
const arraysEqual = (a, b) => {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((val, index) => val === sortedB[index]);
};

export const submitResponse = async (req, res) => {
  try {
    const start = Date.now();

    const { examId, questionId } = req.params;
    const { selectedOptions } = req.body;

    //geting exam document (not attempt) for negative marking
    const exam = await examModel.findById(examId);
    if(!exam){
      return res.status(404).json({ 
        success: false, 
        message: "Exam not found" 
      });
    }

    // Getting active attempt with session data
    const attempt = await ExamAttempt.findOne({
      /* examId: examId, */
      examId,
      studentId: req.user.id,
      isActive: true,
      isCompleted: false
    });

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "No active exam attempt found"
      });
    }

    // Check existing response for THIS SPECIFIC ATTEMPT
    const existingResponse = await Response.findOne({
      examAttemptId: attempt._id,
      questionId
    });

    if (existingResponse) {
      return res.status(400).json({ 
        success: false, 
        message: "Response already submitted for this attempt" 
      });
    }
    // Getting question details
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ 
        success: false, 
        message: "Question not found" 
      });
    }
    /* const exam = await ExamAttempt.findById(examId);
    if(exam.isNegativeMarking && !isCorrect){
      marksObtained = -question.marks * (exam.negativeMarkingPercentage / 100);
    } */

    // Auto-grading logic
    let isCorrect = null;
    let marksObtained = 0;
    
    if (question.isAutoGraded) {
      const correctOptions = question.options
        .map((opt, index) => opt.isCorrect ? index : -1)
        .filter(i => i !== -1);
      
      isCorrect = JSON.stringify(selectedOptions.sort()) === JSON.stringify(correctOptions.sort());
      marksObtained = isCorrect ? question.marks : 0;
      
      //applying negative marking
      if(!isCorrect && exam.isNegativeMarking){
        const negativeMarks = question.marks * (exam.negativeMarkingPercentage / 100);
        marksObtained -= negativeMarks;
      }
    }

    const timeSpent = Date.now() - start;

    //Creating response record
    const response = new Response({
      examAttemptId: attempt._id,
      examId,
      questionId,
      studentId: req.user.id,
      selectedOptions,
      isCorrect,
      marksObtained,
      timeSpent
    });

    await response.save();
// Log the activity
    await ExamLog.updateOne(
      { examId, studentId: req.user.id },
      { $push: { activityLog: {
          timestamp: new Date(),
          action: 'answered',
          questionId
        }
      }}
    );

    //Updating the analytics
    await updateExamAnalytics(examId);

    res.status(201).json({ 
      success: true, 
      message: "Response submitted successfully",
      response 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const gradeResponse = async (req, res) => {
  try {
    const { responseId } = req.params;
    const { marksObtained } = req.body;

    const response = await Response.findByIdAndUpdate(
      responseId,
      { marksObtained },
      { new: true }
    );

    if (!response) {
      return res.status(404).json({ 
        success: false, 
        message: "Response not found" 
      });
    }

    // Update result aggregate
    await Result.updateOne(
      { examId: response.examId, studentId: response.studentId },
      { $inc: { marksObtained: marksObtained } }
    );

    res.status(200).json({ 
      success: true, 
      message: "Response graded successfully",
      response 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
