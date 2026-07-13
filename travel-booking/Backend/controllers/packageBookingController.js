const PackageBooking = require("../models/PackageBooking");

const createPackageBooking = async (req, res) => {
  try {
    console.log(req.body);

    const {
      packageName,
      location,
      price,
      totalPrice,
      name,
      email,
      phone,
      travelers,
      date,
    } = req.body;

    if (!packageName) {
      return res.status(400).json({
        success: false,
        message: "Package Name is required",
      });
    }

    const booking = await PackageBooking.create({
      packageName,
      location,
      price,
      totalPrice,
      name,
      email,
      phone,
      travelers,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      booking,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await PackageBooking.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Package Booking
let deletePackageBooking = async (req, res) => {
  try {
    const booking = await PackageBooking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Package booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Package booking cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createPackageBooking,getAllBookings,deletePackageBooking 
};