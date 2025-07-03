 
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  addFavorite,
  removeFavorite
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser); 
router.get("/profile", protect, getProfile);
router.post("/favorites", protect, addFavorite);
router.delete("/favorites/:city", protect, removeFavorite);

module.exports = router;
