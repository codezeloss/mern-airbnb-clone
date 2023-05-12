const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");

// @desc   Book a place
// @route  POST /all-places
// @access Private
const bookPlace = async (req, res) => {
  const { token } = req.cookies;

  await jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
    if (err) throw err;

    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
      req.body;

    try {
      const bookedPlace = await Booking({
        place,
        user: userData.id,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        price,
      });
      res.json(bookedPlace);
    } catch (error) {
      res.json(error.message);
    }
  });
};

// @desc   Get all places booked by the user
// @route  GET /user-bookings
// @access Private
const getUserBookings = async (req, res) => {
  const { token } = req.cookies;

  await jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
    if (err) throw err;

    const bookedPlaces = await Booking.find({ user: userData.id }).populate(
      "place"
    );
    res.json(bookedPlaces);
  });
};

module.exports = { bookPlace, getUserBookings };
