const mongoose = require("mongoose");

const packageBookingSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true,
    },

    location: String,

    price: Number,

    totalPrice: Number,

    name: String,

    email: String,

    phone: String,

    travelers: Number,

    date: Date,

    paymentStatus: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PackageBooking",
  packageBookingSchema
);