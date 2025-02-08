import mongoose from 'mongoose';

// Schema for user details
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['Student', 'Faculty', 'Admin']},
    verifyOtp: { type: String, default: '' },
    verifyOtpExpireAt: { type: Date, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: '' },
    resetOtpExpireAt: { type: Date, default: 0 },
});

//Creating model for storing user details
const userModel = mongoose.models['user-details'] || mongoose.model('user-details', userSchema);

export default userModel;