const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    // service: "gmail",
      host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


const sendEmailOTP = async (email, otp) => {

    try {
        const mailOptions = {
            from: `"Travel Booking System" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP Verification Code",
            html: `
                <div style="font-family: Arial, sans-serif; padding:20px;">
                    <h2>Email Verification</h2>

                    <p>Your OTP is:</p>

                    <h1 style="color:#0d6efd;">${otp}</h1>

                    <p>This OTP will expire in <b>5 minutes</b>.</p>

                    <p>If you didn't request this OTP, please ignore this email.</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("Email sent:", info.response);

        return info;

    } catch (error) {
    console.error("Email Error:", error);
    throw error;
}

};

module.exports = sendEmailOTP;