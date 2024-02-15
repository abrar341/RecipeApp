const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "fill the username or password" });
  }
  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "fill username or password " });
  }
  const userAvailable = await User.findOne({ username });
  if (!userAvailable) {
    return res.status(400).json({ message: "username or password is invalid" });
  }
  const ispasswordValid = await bcrypt.compare(
    password,
    userAvailable.password
  );

  if (!ispasswordValid) {
    return res.status(400).json({ message: "username or password is invalid" });
  }
  const token = jwt.sign({ id: userAvailable._id }, "secret");
  res
    .status(200)
    .json({ messege: "Login Successfully", token, UserId: userAvailable._id });
});

module.exports = router;
