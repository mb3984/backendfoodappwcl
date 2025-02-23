const express = require("express");
const router = express.Router();
const {
  userLogin,
  userSignUp,
  getUser,
} = require("../controllers/userController");
const verifyToken = require("../middleware/auth"); // Import authentication middleware

// 📌 Authentication Routes
router.post("/signUp", userSignUp); // User Registration
router.post("/login", userLogin); // User Login

// 🔒 Protected Route (Requires Authentication)
router.get("/user/:id", verifyToken, getUser); // Get User Details

module.exports = router;
