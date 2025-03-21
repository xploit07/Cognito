import mongoose from 'mongoose';
import Analytics from '../models/analyticsModel.js';
import ExamLog from '../models/examLogModel.js';
import Result from '../models/resultModel.js';
import Response from '../models/responseModel.js';
import ExamAttempt from '../models/examAttemptModel.js';
import Exam from '../models/examModel.js';

// Controller to update exam analytics
export const updateExamAnalytics = async (examId) => {
  try {
    const [attempts, responses, logs, totalMarks] = await Promise.all([
      ExamAttempt.find({ examId }).lean(),
      Response.find({ examId }).lean(),
      ExamLog.find({ examId }).lean(),
      Exam.findById(examId).select('totalMarks').lean()
    ]);

    // Unique students calculation with null check
    const uniqueStudentsResult = await ExamAttempt.aggregate([
      { $match: { examId: new mongoose.Types.ObjectId(examId) } },
      { $group: { _id: "$studentId" } },
      { $count: "uniqueStudents" }
    ]);
    const uniqueStudents = uniqueStudentsResult[0]?.uniqueStudents || 0;

    // Question statistics with null checks
    const questionStats = await Response.aggregate([
      { $match: { examId: new mongoose.Types.ObjectId(examId) } },
      { $group: {
        _id: "$questionId",
        correct: { $sum: { $cond: ["$isCorrect", 1, 0] } },
        total: { $sum: 1 },
        avgTime: { $avg: "$timeSpent" }
      }},
      { $lookup: {
        from: "questions",
        localField: "_id",
        foreignField: "_id",
        as: "question"
      }}
    ]);

    // Score calculations with null checks
    const validScores = responses.filter(r => typeof r.marksObtained === 'number');
    const scores = validScores.map(r => r.marksObtained);
    const scoreData = {
      distribution: calculateScoreDistribution(scores, totalMarks),
      average: scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0,
      highest: scores.length > 0 ? Math.max(...scores) : 0,
      lowest: scores.length > 0 ? Math.min(...scores) : 0
    };

    // Participation data with null checks
    const participation = {
      hourly: logs?.length ? calculateHourlyParticipation(logs) : [],
      daily: attempts?.length ? calculateDailyParticipation(attempts) : []
    };

    await Analytics.findOneAndUpdate(
      { examId },
      {
        uniqueStudents,
        totalAttempts: attempts?.length || 0,
        questionStats: questionStats?.map(stat => ({
          questionId: stat._id,
          correctAttempts: stat.correct || 0,
          totalAttempts: stat.total || 0,
          averageTime: stat.avgTime || 0,
          questionText: stat.question[0]?.questionText || 'Deleted Question'
        })) || [],
        scores: scoreData,
        participation
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error('Analytics update failed:', error);
  }
};
// Controller to get analytics
export const getExamAnalytics = async (req, res) => {
  try {
    const { examId } = req.params;
    
    const analytics = await Analytics.findOne({ examId })
      .populate('questionStats.questionId', 'questionText')
      .lean();

    if (!analytics) {
      return res.status(404).json({ 
        success: false, 
        message: "Analytics not found for this exam" 
      });
    }

    // Add real-time calculated data
    const [results, logs] = await Promise.all([
      Result.find({ examId }).lean(),
      ExamLog.find({ examId }).lean()
    ]);

    analytics.timeSeriesData = {
      participationRate: calculateHourlyParticipation(logs),
      participationRate: calculateDailyParticipation(logs),
      scoreDistribution: calculateScoreDistribution(results)
    };

    res.status(200).json({ 
      success: true, 
      analytics 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Helper: Generate hourly participation data
const calculateHourlyParticipation = (logs) => {
  return logs.reduce((acc, log) => {
    log.events.forEach(event => {
      const hour = new Date(event.timestamp);
      hour.setMinutes(0, 0, 0);
      const key = hour.toISOString();
      
      acc[key] = acc[key] || { hour, count: 0 };
      if (event.type === 'start') acc[key].count++;
    });
    return acc;
  }, {});
};
// Helper: Generate daily participation data
const calculateDailyParticipation = (attempts) => {
  return attempts.reduce((acc, attempt) => {
    const day = new Date(attempt.createdAt);
    day.setHours(0, 0, 0, 0);
    const key = day.toISOString();
    
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
};
// Helper: Generate score distribution
const calculateScoreDistribution = (scores, totalMarksDoc) => {
  const distribution = {
    '0-25%': 0,
    '25-50%': 0,
    '50-75%': 0,
    '75-100%': 0
  };

  // Handle null/undefined cases
  if (!scores || scores.length === 0) return [];
  if (!totalMarksDoc?.totalMarks || totalMarksDoc.totalMarks <= 0) {
    return Object.entries(distribution).map(([range]) => ({
      range,
      count: 0
    }));
  }

  const totalMarks = totalMarksDoc.totalMarks;
  
  scores.forEach(score => {
    const percentage = totalMarks > 0 ? (score / totalMarks) * 100 : 0;
    if (percentage <= 25) distribution['0-25%']++;
    else if (percentage <= 50) distribution['25-50%']++;
    else if (percentage <= 75) distribution['50-75%']++;
    else distribution['75-100%']++;
  });

  return Object.entries(distribution).map(([range, count]) => ({
    range,
    count
  }));
};

