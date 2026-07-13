const { v4: uuidv4 } = require("uuid");

const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const verificationId = uuidv4();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    return {
        otp,
        verificationId,
        expiresAt
    };
};

module.exports = generateOTP;