import mongoose from "mongoose";

// models/sectionModel.js
const sectionSchema = new mongoose.Schema({
    examId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Exam', 
      required: true 
    },
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String 
    },
    order: { 
      type: Number, 
      required: true 
    }, // For sequencing sections
  });
  
  const sectionModel = mongoose.models['Section'] || mongoose.model('Section', sectionSchema);
  export default sectionModel;