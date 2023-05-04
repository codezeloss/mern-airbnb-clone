const express = require("express");
const router = express.Router();
const { register, login, profile } = require("../controllers/userController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").post(profile);

module.exports = router;
