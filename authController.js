const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.register = async (req, res) => {
  const { name, email, password, role, city, state } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
    city,
    state,
  });

  res.status(201).json({
    _id: user._id,
    token: generateToken(user._id),
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const bcrypt = require("bcryptjs");

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};