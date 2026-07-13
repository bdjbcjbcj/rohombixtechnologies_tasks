const Newsletter = require("../models/Newsletter");

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const existingEmail = await Newsletter.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    const subscriber = await Newsletter.create({
      email,
    });

    res.status(201).json({
      success: true,
      message: "Subscribed Successfully",
      subscriber,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  subscribeNewsletter,
};
