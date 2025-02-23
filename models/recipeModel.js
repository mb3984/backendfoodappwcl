const mongoose = require("mongoose");

const recipesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  imageUrl: {
    // Changed coverImage to imageUrl
    type: String,
    default: "", // Optional field
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // No longer required
  },
});

const FoodRecipe = mongoose.model("FoodRecipes", recipesSchema);
module.exports = FoodRecipe;
