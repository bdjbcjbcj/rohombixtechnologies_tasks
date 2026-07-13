const mongoose = require("mongoose");

const destinationBookingSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    travelers: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    bookingStatus: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "DestinationBooking",
  destinationBookingSchema
);