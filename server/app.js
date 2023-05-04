const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

// MIDDLEWARES
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.static("./public"));
app.use(cookieParser());

// MORGAN
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ROUTES
app.use("/api/v1/", userRoutes);

module.exports = app;
