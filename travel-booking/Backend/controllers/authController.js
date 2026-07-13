const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter email and password",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  res.status(200).json({
    success: true,
    message: "Login Successful",
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
};