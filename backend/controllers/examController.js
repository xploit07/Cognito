import Exam from '../models/examModel.js';
import ExamAttempt from '../models/examAttemptModel.js';
import Question from '../models/questionModel.js';
import Response from '../models/responseModel.js';
import Result from '../models/resultModel.js';
import ExamLog from '../models/examLogModel.js';
import Analytics from '../models/analyticsModel.js';

export const createExam = async (req, res) => {
  try {
    const { title, description, startTime, endTime, duration, instructions } = req.body;

    if (!title || !startTime || !endTime || !duration) {
      return res.status(400).json({ 
        success: false, 
        message: "Title, start time, end time, and duration are required" 
      });
    }
    if (new Date(startTime) < Date.now()) {
      return res.status(400).json({ 
        success: false, 
        message: "Start time must be in the future" 
      });
    }else if (new Date(endTime) < new Date(startTime)) {
      return res.status(400).json({
        success: false,
        message: "End time must be after start time"
      });
    }else if (duration < 1) {
      return res.status(400).json({
        success: false,
        message: "Duration must be at least 1 minute"
      });  
    } 
    const newExam = new Exam({
      title,
      description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      duration,
      instructions,      
      createdBy: req.user.id
    });

    await newExam.save();
    
    res.status(201).json({ 
      success: true, 
      message: "Exam created successfully",
      exam: newExam 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.examId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!exam) {
      return res.status(404).json({ 
        success: false, 
        message: "Exam not found" 
      });
    }
    //Recording updated exam details in the database
    await exam.save();

    res.status(200).json({ 
      success: true, 
      message: "Exam updated successfully",
      exam 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const publishExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.examId,
      { status: 'published' },
      { new: true }
    );

    if (!exam) {
      return res.status(404).json({ 
        success: false, 
        message: "Exam not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Exam published successfully",
      exam 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const listActiveExams = async (req, res) => {
    try {
      // Getting query parameters with defaults
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || '-createdAt'; // Default: newest first
      const searchQuery = req.query.search || '';
  
      // Calculating pagination skip value
      const skip = (page - 1) * limit;
  
      // Base query for active exams
      const baseQuery = {
        status: 'published',
        startTime: { $lte: new Date() },
        endTime: { $gte: new Date() }
      };
  
      // Adding search filter if provided
      if (searchQuery) {
        baseQuery.title = { 
          $regex: searchQuery, 
          $options: 'i' // Case-insensitive
        };
      }
  
      // Getting paginated results and total count
      const [exams, total] = await Promise.all([
        // Getting exams with sorting and pagination
        Exam.find(baseQuery)
          .sort(sortBy)
          .skip(skip)
          .limit(limit)
          .select('-createdBy -__v -instructions')
          .lean(),
  
        // Get total matching exams count
        Exam.countDocuments(baseQuery)
      ]);
  
      res.status(200).json({
        success: true,
        exams,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: total,
          totalPages: Math.ceil(total / limit)
        }
      });
  
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
};

export const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.examId);

    if (!exam) {
      return res.status(404).json({ 
        success: false, 
        message: "Exam not found" 
      });
    }

    // Cleanup related data
    await Promise.all([
      ExamAttempt.deleteMany({ examId: req.params.examId }),
      Question.deleteMany({ examId: req.params.examId }),
      Response.deleteMany({ examId: req.params.examId }),
      Result.deleteMany({ examId: req.params.examId }),
      ExamLog.deleteMany({ examId: req.params.examId }),
      Analytics.deleteMany({ examId: req.params.examId })
    ]);

    res.status(200).json({ 
      success: true, 
      message: "Exam deleted successfully" 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getExamQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ examId: req.params.examId });
    
    // Shuffle questions
    const shuffledQuestions = questions
      .map(q => ({...q._doc, options: shuffleArray(q.options)}))
      .sort(() => Math.random() - 0.5);

    res.status(200).json({ 
      success: true, 
      questions: shuffledQuestions 
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//Helper Function
const shuffleArray = (array) => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const startExamAttempt = async (req, res) => {
  try {
    //Check if exam exists
    const exam = await Exam.findById(req.params.examId);
        if (!exam){
           return res.status(404).json({ 
            success: false, 
            message: "Exam not found" 
          });
        }
    // Check for existing incomplete attempt
    const existingAttempt = await ExamAttempt.findOne({
      examId: req.params.examId,
      studentId: req.user.id,
      isActive: true,
      isCompleted: false
    });

    if (existingAttempt) {
      return res.status(400).json({
        success: false,
        message: "You have an existing attempt in progress"
      });
    }

    // Create new incomplete attempt with session data
    const attempt = new ExamAttempt({
      examId: req.params.examId,
      studentId: req.user.id,
      duration: exam.duration,
      isActive: true,
      isCompleted: false
    });

    await attempt.save();
    
    // Create exam log entry AFTER attempt creation
    await ExamLog.create({
      examId: req.params.examId,
      studentId: req.user.id,
      attemptId: attempt._id,
      events: [{
        type: 'start',
        timestamp: new Date()
      }]
    });

    res.status(201).json({
      success: true,
      message: "Exam attempt started",
      attempt
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const completeExamAttempt = async (req, res) => {
  try {
    const { examId } = req.params;

    const attempt = await ExamAttempt.findOneAndUpdate(
      { 
        examId: examId,
        studentId: req.user.id,
        isActive: true,
        isCompleted: false 
      },
      { 
        $set: { isCompleted: true, isActive: false },
        $inc: { attemptCount: 1 } 
      },
      { new: true }
    );

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "No active attempt found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam attempt completed",
      attempt
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};