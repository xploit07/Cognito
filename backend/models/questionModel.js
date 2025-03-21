import mongoose from "mongoose";

// models/questionModel.js
const questionSchema = new mongoose.Schema({
    examId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Exam', 
      required: true 
    },
    questionText: { 
      type: String, 
      required: true 
    }, // HTML allowed
    questionType: { 
      type: String, 
      enum: ['mcq', 'msq'], 
      required: true 
    },
    options: [{
      text: { 
        type: String, 
        required: true 
      },
      isCorrect: { 
        type: Boolean, 
        default: false 
      }, // For auto-grading
    }],
    marks: { 
      type: Number, 
      required: true 
    },
    explanation: { 
      type: String, 
      default: '' 
    }, // Post-exam review
    isAutoGraded: { 
      type: Boolean, 
      default: true 
    }, // If false, manual grading needed
  });
  
  const questionModel = mongoose.models['Question'] || mongoose.model('Question', questionSchema);

  export default questionModel;