const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
      index: true,
    },
    ingredients: {
      type: Array, // Ensures it's an array of strings
      required: true,
    },
    instructions: {
      type: String,
      required: true,
      trim: true, // Removes unnecessary spaces
    },
    time: {
      type: Number, // Stores time in minutes
      min: 1,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("Recipe", recipeSchema);
