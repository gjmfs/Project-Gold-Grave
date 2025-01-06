const express = require("express");

const { login, signup } = require("../controllers/userController");

const router = express.Router();

//user login check
router.post("/login", login);

//user registration
router.post("/signup", signup);

module.exports = router;
