const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET = "secretkey";

router.post("/register", async (req, res) => {
  const existing = await User.findOne({ email: req.body.email });
  if (existing) return res.status(400).send({ message: "User already exists" });

  const hashed = await bcrypt.hash(req.body.password, 10);
  await User.create({ email: req.body.email, password: hashed });

  res.send({ message: "User created" });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid");

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).send("Invalid");

  const token = jwt.sign({ id: user._id }, SECRET);
  res.send({ token });
});

module.exports = router;
