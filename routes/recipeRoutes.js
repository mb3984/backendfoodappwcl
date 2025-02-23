const express = require("express");
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController"); // ✅ Matching function names

const verifyToken = require("../middleware/auth");

const router = express.Router();

// 📌 Public Routes (No Authentication Required)
router.get("/getAll", getAllRecipes); // Get all recipes
router.get("/get/:id", getRecipeById); // Get a single recipe by ID

// 🔒 Protected Routes (Requires Authentication)
router.post("/post", verifyToken, createRecipe);
router.put("/update/:id", verifyToken, updateRecipe);
router.delete("/delete/:id", verifyToken, deleteRecipe);

module.exports = router;
