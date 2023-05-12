const express = require("express");
const router = express.Router();

const {
  bookPlace,
  getUserBookings,
} = require("../controllers/bookingController");

router.route("/new-booking").post(bookPlace);
router.route("/user-bookings").get(getUserBookings);

module.exports = router;
