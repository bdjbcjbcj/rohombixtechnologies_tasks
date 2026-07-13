const express = require("express");

const router = express.Router();

const {
  createPackageBooking,
  getAllBookings,
  deletePackageBooking,
} = require("../controllers/packageBookingController");

router.post("/",  createPackageBooking);
router.get("/", getAllBookings);
// Delete Package Booking
router.delete("/:id", deletePackageBooking);

module.exports = router;