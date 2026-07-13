const stripe = require("../config/stripe");

const Payment = require("../models/Payment");
const DestinationBooking = require("../models/DestinationBooking");
const PackageBooking = require("../models/PackageBooking");

// =========================================
// Create Stripe Payment Intent
// =========================================

exports.createPaymentIntent = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { amount, bookingId } = req.body;

    if (amount === undefined || amount === null) {
      return res.status(400).json({
        success: false,
        message: "Amount is required.",
      });
    }

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required.",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Stripe Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// Save Payment
// =========================================

exports.savePayment = async (req, res) => {
  try {
    const {
      bookingId,
      bookingType,
      paymentIntentId,
      transactionId,
      amount,
      paymentMethod,
      status,
    } = req.body;

    const exists = await Payment.findOne({
      paymentIntentId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Payment already exists.",
      });
    }

    const payment = await Payment.create({
      bookingId,
      bookingType,
      paymentIntentId,
      transactionId,
      amount,
      paymentMethod,
      status,
    });

    if (bookingType === "DestinationBooking") {
      await DestinationBooking.findByIdAndUpdate(
        bookingId,
        {
          paymentStatus: "Paid",
        }
      );
    }

    if (bookingType === "PackageBooking") {
      await PackageBooking.findByIdAndUpdate(
        bookingId,
        {
          paymentStatus: "Paid",
        }
      );
    }

    res.status(201).json({
      success: true,
      message: "Payment Saved Successfully",
      payment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// Payment History
// =========================================


exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("bookingId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};