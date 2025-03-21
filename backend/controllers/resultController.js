import Result from '../models/resultModel.js';
import Exam from '../models/examModel.js';
import Response from '../models/responseModel.js';
import ExamAttempt from '../models/examAttemptModel.js';
import { Parser } from 'json2csv';

export const generateResult = async (req, res) => {
  try {
    const { examId } = req.params;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ 
        success: false, 
        message: "Exam not found" 
      });
    }
    if(!exam.totalMarks){
      return res.status(400).json({ 
        success: false, 
        message: "Exam has no questions or total marks are not calculated"
      });
    }

    // Getting all completed attempts for this exam
    const attempts = await ExamAttempt.find({ 
      examId,
      isCompleted: true 
    });

    // Processing each attempt individually
    const bulkOps = await Promise.all(attempts.map(async (attempt) => {
      const responses = await Response.find({ examAttemptId: attempt._id });
      
      const totalMarks = responses.reduce(
        (sum, response) => sum + response.marksObtained,
        0
      );

      const percentage = (totalMarks / exam.totalMarks) * 100;
      const isPassed = percentage >= exam.passingPercentage;

      return {
        updateOne: {
          filter: { 
            examId: attempt.examId,
            studentId: attempt.studentId,
            attemptId: attempt._id 
          },
          update: {
            $set: {
              totalMarks: exam.totalMarks,
              marksObtained: totalMarks,
              attemptId: attempt._id,
              percentage,
              isPassed
            }
          },
          upsert: true
        }
      };
    }));

    await Result.bulkWrite(bulkOps);

    res.status(200).json({ 
      success: true, 
      message: "Results generated successfully" 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getStudentResult = async (req, res) => {
  try {
    const { examId } = req.params;
    const studentId = req.user.role === 'Student' ? req.user.id : req.query.studentId;

    const result = await Result.find({ examId, studentId })
      .populate('examId', 'title')
      .populate('studentId', 'firstName lastName');

    if (!result) {
      return res.status(404).json({ 
        success: false, 
        message: "Result not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      result 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const exportExamResults = async (req, res) => {
  try {
    const { examId } = req.params;
    
    const results = await Result.find({ examId })
      .populate('studentId', 'firstName lastName email')
      .lean();

    const csvFields = [
      { label: 'Student Name', value: row => `${row.studentId.firstName} ${row.studentId.lastName}` },
      { label: 'Email', value: 'studentId.email' },
      { label: 'Marks Obtained', value: 'marksObtained' },
      { label: 'Percentage', value: 'percentage' }
    ];

    const csvParser = new Parser({ fields: csvFields });
    const csvData = csvParser.parse(results);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=exam-${examId}-results.csv`);
    res.status(200).send(csvData);

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};