import mongoose from "mongoose";

const examLogSchema = new mongoose.Schema({
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
  attemptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamAttempt',
    required: true
  },
  events: [{
    type: {
      type: String,
      enum: ['start', 'answer', 'pause', 'resume', 'complete'],
      required: true
    },
    questionId: mongoose.Schema.Types.ObjectId,
    timestamp: {
      type: Date,
      default: Date.now
    },
    metadata: mongoose.Schema.Types.Mixed
  }],
  warnings: [String],
  duration: Number // Total active duration in seconds
}, { timestamps: true });
  
  const examLogModel = mongoose.models['ExamLog'] || mongoose.model('ExamLog', examLogSchema);
  export default examLogModel;