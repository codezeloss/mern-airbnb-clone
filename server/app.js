const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const placesRoutes = require("./routes/placesRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const cookieParser = require("cookie-parser");

// MIDDLEWARES
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/v1/uploads", express.static(__dirname + "/uploads"));
app.use(cookieParser());

// MORGAN
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ROUTES
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/places", placesRoutes);
app.use("/api/v1/bookings", bookingRoutes);

module.exports = app;
