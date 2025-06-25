 
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @route   POST /api/users/register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// @route   POST /api/users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

// @route GET /api/users/profile
const getProfile = async (req, res) => {
  res.json(req.user);
};

// @route POST /api/users/favorites
const addFavorite = async (req, res) => {
  const { city, country } = req.body;
  const user = await User.findById(req.user._id);
  user.favorites.push({ city, country });
  await user.save();
  res.json(user.favorites);
};

// @route DELETE /api/users/favorites/:city
const removeFavorite = async (req, res) => {
  const cityToRemove = req.params.city.toLowerCase();
  const user = await User.findById(req.user._id);
  user.favorites = user.favorites.filter(fav => fav.city.toLowerCase() !== cityToRemove);
  await user.save();
  res.json(user.favorites);
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  addFavorite,
  removeFavorite
};
