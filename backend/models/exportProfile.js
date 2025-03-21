import mongoose from "mongoose";

// models/exportProfileModel.js
const exportProfileSchema = new mongoose.Schema({
    examId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Exam', 
      required: true 
    },
    format: { 
      type: String, 
      enum: ['csv', 'pdf', 'excel'], 
      required: true 
    },
    includes: [{ 
      type: String, 
      enum: ['questions', 'responses', 'results', 'analytics'] 
    }],
    generatedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user-details', 
      required: true 
    },
    filePath: { 
      type: String 
    }, // URL or server path
  }, { timestamps: true });
  
  const exportProfileModel = mongoose.models['ExportProfile'] || mongoose.model('ExportProfile', exportProfileSchema);
  export default exportProfileModel;