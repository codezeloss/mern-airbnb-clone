const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc   Register the user
// @route  POST /register
// @access Private
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // encrypt the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
};

// @desc   User Login
// @route  POST /login
// @access Private
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    // Check if the user exist
    if (!user) {
      res.status(404).json("User not found!");
      return;
    }

    // Check if the password is correct
    // BCRYPT
    const comparedPassword = bcrypt.compareSync(password, user.password);
    if (comparedPassword) {
      // JWT
      await jwt.sign(
        { name: user.name, email: user.email, id: user._id },
        process.env.SECRET_KEY,
        {},
        function (err, token) {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    } else {
      res.status(404).json("Incorrect Password");
    }
  } catch (error) {
    res.json(error.message);
  }
};

// @desc   get user profile
// @route  POST /profile
// @access Private
const profile = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(404).json(null);
    return;
  }

  await jwt.verify(token, process.env.SECRET_KEY, async (err, info) => {
    if (err) throw err;
    const { name, email, _id } = await User.findById(info.id);
    res.json({ name, email, _id });
  });
};

module.exports = { register, login, profile };
