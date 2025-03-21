import ExamLog from '../models/examLogModel.js';
import User from '../models/userModel.js';

export const getExamLogs = async (req, res) => {
  try {
    const { examId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    
    const query = { examId };
    
    // Optional student filter
    if (req.query.studentId) {
      query.studentId = req.query.studentId;
    }

    const [logs, total] = await Promise.all([
      ExamLog.find(query)
        .skip(skip)
        .limit(limit)
        .populate('studentId', 'firstName lastName email')
        .lean(),
        
      ExamLog.countDocuments(query)
    ]);

    res.status(200).json({
      success: true,
      logs,
      pagination: {
        page,
        limit,
        total,
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