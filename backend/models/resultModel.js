import mongoose from 'mongoose';

// models/resultModel.js
const resultSchema = new mongoose.Schema({
    examId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Exam', 
      required: true 
    },
    studentId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user-details', 
      required: true 
    },
    attemptId: { // Add this field
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ExamAttempt'
    },
    totalMarks: { 
      type: Number, 
      required: true 
    },
    marksObtained: { 
      type: Number, 
      default: 0 
    },
    percentage: { 
      type: Number 
    },
    rank: { 
      type: Number 
    }, // Optional (relative to other students)
    isPassed: { 
      type: Boolean 
    },
    reviewedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user-details' 
    }, // For manual grading
  }, { timestamps: true });
  
  const resultModel = mongoose.models['Result'] || mongoose.model('Result', resultSchema);
  
  export default resultModel;