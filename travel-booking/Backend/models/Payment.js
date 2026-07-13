const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "bookingType",
      required: true,
    },

    bookingType: {
      type: String,
      enum: ["DestinationBooking", "PackageBooking"],
      default: "DestinationBooking",
    },

    paymentIntentId: {
      type: String,
      required: true,
      unique: true,
    },

    transactionId: {
      type: String,
      required: true,
      unique: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "usd",
    },

    paymentMethod: {
      type: String,
      default: "card",
    },

    status: {
      type: String,
      enum: [
        "requires_payment_method",
        "requires_confirmation",
        "requires_action",
        "processing",
        "requires_capture",
        "canceled",
        "succeeded",
      ],
      default: "processing",
    },

    receiptUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);