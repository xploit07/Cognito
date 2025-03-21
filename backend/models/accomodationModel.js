import mongoose from 'mongoose';

// models/accommodationModel.js
const accommodationSchema = new mongoose.Schema({
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
    extraTime: { 
      type: Number, 
      default: 0 
    }, // Minutes
    maxAttemptsOverride: { 
      type: Number 
    },
    isShuffleDisabled: { 
      type: Boolean, 
      default: false 
    },
  });
  
  const accommodationModel = mongoose.models['Accommodation'] || mongoose.model('Accommodation', accommodationSchema);
  export default accommodationModel;