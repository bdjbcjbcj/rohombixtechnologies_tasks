const express = require("express");
const router = express.Router();

const {
  createPaymentIntent,
  savePayment,
  getPaymentHistory,
} = require("../controllers/paymentController");

// const authMiddleware = require("../middleware/authMiddleware");

// ===============================
// Create Stripe Payment Intent
// POST /api/payment/create-payment-intent
// ===============================
router.post(
  "/create-payment-intent",
  // authMiddleware,
  createPaymentIntent
);

// ===============================
// Save Successful Payment
// POST /api/payment/save-payment
// ===============================
router.post(
  "/save-payment",
  // authMiddleware,
  savePayment
);

// ===============================
// Get Logged-in User Payment History
// GET /api/payment/history
// ===============================
router.get(
  "/history",
  // authMiddleware,
  getPaymentHistory
);

module.exports = router;