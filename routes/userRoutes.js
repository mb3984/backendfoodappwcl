const express = require("express");
const router = express.Router();
const {
  userLogin,
  userSignUp,
  getUser,
} = require("../controllers/userController");
const verifyToken = require("../middleware/auth"); // Import authentication middleware

// 📌 Authentication Routes
router.post("/SignUp", userSignUp); // User Registration
router.post("/Login", userLogin); // User Login

// 🔒 Protected Route (Requires Authentication)
router.get("/User/:id", verifyToken, getUser); // Get User Details

module.exports = router;
