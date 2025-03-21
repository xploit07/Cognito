import mongoose from "mongoose";

// models/notificationModel.js
const notificationSchema = new mongoose.Schema({
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user-details', 
      required: true 
    },
    message: { 
      type: String, 
      required: true 
    },
    type: { 
      type: String, 
      enum: ['exam', 'result', 'general'], 
      required: true 
    },
    isRead: { 
      type: Boolean, 
      default: false 
    },
    expiresAt: { 
      type: Date 
    }, // Auto-delete old notifications
  }, { timestamps: true });
  
  const notificationModel = mongoose.models['Notification'] || mongoose.model('Notification', notificationSchema);
  export default notificationModel;