const DestinationBooking = require("../models/DestinationBooking");

exports.createBooking = async (req, res) => {
  try {
    console.log(req.body);

    const booking = await DestinationBooking.create(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
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
exports.getBookings = async (req, res) => {
  try {
    const bookings = await DestinationBooking.find().sort({
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
// Delete Booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await DestinationBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await DestinationBooking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};