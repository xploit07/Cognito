import mongoose from "mongoose";

// models/examAttemptModel.js
const examAttemptSchema = new mongoose.Schema({
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
    // Session Management Fields
      startTime: {
        type: Date,
        default: Date.now
      },
      duration: {
        type: Number,
        required: true
      },
      isActive: {
        type: Boolean,
        default: true
      },
    attemptCount: { 
      type: Number, 
      default: 0 
    },
    lastAttemptAt: { 
      type: Date 
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  }, {timestamps: true});

  examAttemptSchema.index(
    { examId: 1, studentId: 1, isCompleted: 1 },
    { 
      unique: true, 
      partialFilterExpression: { 
        isCompleted: false 
      }
    }
  );
  
  const examAttemptModel = mongoose.models['ExamAttempt'] || mongoose.model('ExamAttempt', examAttemptSchema);
  export default examAttemptModel;