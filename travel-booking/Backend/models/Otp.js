const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        otp: {
            type: String,
            required: true
        },

        verificationId: {
            type: String,
            required: true,
            unique: true
        },

        expiresAt: {
            type: Date,
            required: true
        },

        verified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Otp", otpSchema);