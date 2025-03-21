import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
    unique: true
  },
  uniqueStudents: {
    type: Number,
    default: 0
  },
  totalAttempts: {
    type: Number,
    default: 0
  },
  questionStats: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    correctAttempts: Number,
    totalAttempts: Number,
    averageTime: Number
  }],
  participation: {
    hourly: [{
      hour: Date,
      activeStudents: Number
    }],
    daily: [{
      date: Date,
      attempts: Number
    }]
  },
  scores: {
    distribution: [{
      range: String,
      count: Number
    }],
    average: Number,
    highest: Number,
    lowest: Number
  }
}, { timestamps: true });
  
  const analyticsModel = mongoose.models['Analytics'] || mongoose.model('Analytics', analyticsSchema);
  export default analyticsModel;