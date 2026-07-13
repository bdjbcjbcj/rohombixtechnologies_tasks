const express = require("express");

const router = express.Router();

const {
  createBooking,
  getBookings,
  deleteBooking,
} = require("../controllers/destinationBookingController");

router.post("/booking", createBooking);
// Get All Bookings
router.get("/booking", getBookings);
router.delete("/booking/:id", deleteBooking);

module.exports = router;