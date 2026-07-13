const Otp = require("../models/Otp");
const User = require("../models/User");

const generateOTP = require("../utils/generateOTP");
const sendEmailOTP = require("../services/emailService");

// =======================
// Send OTP
// =======================

exports.sendOTP = async (req, res) => {
    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // Delete previous OTPs
        await Otp.deleteMany({ email });

        const data = generateOTP();

        await Otp.create({
            email,
            otp: data.otp,
            verificationId: data.verificationId,
            expiresAt: data.expiresAt
        });

        await sendEmailOTP(email, data.otp);

        res.status(200).json({
            success: true,
            verificationId: data.verificationId,
            message: "OTP sent successfully to your email."
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// =======================
// Verify OTP
// =======================

exports.verifyOTP = async (req, res) => {

    try {

        const { verificationId, otp } = req.body;

        if (!verificationId || !otp) {

            return res.status(400).json({
                success: false,
                message: "Verification ID and OTP are required"
            });

        }

        const otpRecord = await Otp.findOne({ verificationId });

        if (!otpRecord) {

            return res.status(404).json({
                success: false,
                message: "Invalid verification ID"
            });

        }

        if (otpRecord.expiresAt < new Date()) {

            await Otp.deleteOne({
                _id: otpRecord._id
            });

            return res.status(400).json({
                success: false,
                message: "OTP has expired"
            });

        }

        if (otpRecord.otp !== otp) {

            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });

        }

        otpRecord.verified = true;

        await otpRecord.save();

        // Update user verification
        await User.findOneAndUpdate(
            {
                email: otpRecord.email
            },
            {
                isEmailVerified: true
            }
        );

        // Delete OTP after successful verification
        await Otp.deleteOne({
            _id: otpRecord._id
        });

        res.status(200).json({
            success: true,
            message: "OTP verified successfully."
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// =======================
// Resend OTP
// =======================

exports.resendOTP = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {

            return res.status(400).json({
                success: false,
                message: "Email is required"
            });

        }

        await Otp.deleteMany({ email });

        const data = generateOTP();

        await Otp.create({

            email,

            otp: data.otp,

            verificationId: data.verificationId,

            expiresAt: data.expiresAt

        });

        await sendEmailOTP(email, data.otp);

        res.status(200).json({

            success: true,

            verificationId: data.verificationId,

            message: "OTP resent successfully."

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =======================
// Delete Expired OTPs
// =======================

exports.deleteExpiredOTPs = async () => {

    try {

        await Otp.deleteMany({

            expiresAt: {

                $lt: new Date()

            }

        });

        console.log("Expired OTPs deleted.");

    } catch (error) {

        console.log(error);

    }

};