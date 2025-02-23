// const FoodRecipe = require("../models/recipeModel");

// const createRecipe = async (req, res) => {
//   try {
//     console.log("📝 Request Body:", req.body);

//     const { title, ingredients, instructions, time, imageUrl, createdBy } =
//       req.body;

//     // Validation for required fields (excluding createdBy)
//     if (!title || !ingredients || !instructions || !imageUrl) {
//       console.log("⚠️ Missing required fields");
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const newRecipe = new FoodRecipe({
//       title,
//       ingredients,
//       instructions,
//       time,
//       imageUrl, // Changed from coverImage to imageUrl
//       createdBy, // Optional field
//     });

//     const savedRecipe = await newRecipe.save();

//     console.log("✅ Recipe created successfully:", savedRecipe);
//     res.status(201).json(savedRecipe);
//   } catch (error) {
//     console.error("❌ Error creating recipe:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// const getAllRecipes = async (req, res) => {
//   try {
//     console.log(`📜 [GET ALL] Request received: ${req.method} `);

//     const recipes = await FoodRecipe.find().populate("createdBy", "name email");

//     console.log(`✅ Retrieved ${recipes.length} recipes`);
//     res.status(200).json(recipes);
//   } catch (error) {
//     console.error("❌ Error fetching recipes:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// const getRecipeById = async (req, res) => {
//   try {
//     console.log(`🔍 [GET ONE] Request received: ${req.method} ${req.url}`);
//     console.log("🆔 Recipe ID:", req.params.id);

//     const recipe = await FoodRecipe.findById(req.params.id).populate(
//       "createdBy",
//       "name email"
//     );

//     if (!recipe) {
//       console.log("⚠️ Recipe not found");
//       return res.status(404).json({ message: "Recipe not found" });
//     }

//     console.log("✅ Recipe found:", recipe);
//     res.status(200).json(recipe);
//   } catch (error) {
//     console.error("❌ Error fetching recipe:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// const updateRecipe = async (req, res) => {
//   try {
//     console.log(`✏️ [UPDATE] Request received: ${req.method} ${req.url}`);
//     console.log("🆔 Recipe ID:", req.params.id);
//     console.log("📝 Updated Data:", req.body);

//     const updatedRecipe = await FoodRecipe.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updatedRecipe) {
//       console.log("⚠️ Recipe not found");
//       return res.status(404).json({ message: "Recipe not found" });
//     }

//     console.log("✅ Recipe updated:", updatedRecipe);
//     res.status(200).json(updatedRecipe);
//   } catch (error) {
//     console.error("❌ Error updating recipe:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// const deleteRecipe = async (req, res) => {
//   try {
//     console.log(`🗑️ [DELETE] Request received: ${req.method} ${req.url}`);
//     console.log("🆔 Recipe ID:", req.params.id);

//     const deletedRecipe = await FoodRecipe.findByIdAndDelete(req.params.id);

//     if (!deletedRecipe) {
//       console.log("⚠️ Recipe not found");
//       return res.status(404).json({ message: "Recipe not found" });
//     }

//     console.log("✅ Recipe deleted:", deletedRecipe);
//     res.status(200).json({ message: "Recipe deleted successfully" });
//   } catch (error) {
//     console.error("❌ Error deleting recipe:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Export all functions using module.exports
// module.exports = {
//   createRecipe,
//   getAllRecipes,
//   getRecipeById,
//   updateRecipe,
//   deleteRecipe,
// };

const FoodRecipe = require("../models/recipeModel");
const User = require("../models/userModel"); // Import User model

const createRecipe = async (req, res) => {
  try {
    // Log the incoming request for debugging
    console.log("🔑 [AUTH] User ID from token:", req.user.id);

    // Verify if the user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log("⚠️ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Proceed with creating the recipe
    const { title, ingredients, instructions, time, imageUrl } = req.body;

    const newRecipe = new FoodRecipe({
      title,
      ingredients,
      instructions,
      time,
      imageUrl,
      createdBy: req.user.id, // Link the recipe to the user
    });

    await newRecipe.save();
    return res.status(201).json({
      message: "Recipe created successfully",
      recipe: newRecipe,
    });
  } catch (error) {
    console.error("❌ Error in postRecipe controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getAllRecipes = async (req, res) => {
  try {
    console.log(`📜 [GET ALL] Request received: ${req.method} `);

    const recipes = await FoodRecipe.find().populate("createdBy", "name email"); // Populating the createdBy field with email

    console.log(`✅ Retrieved ${recipes.length} recipes`);
    res.status(200).json(recipes);
  } catch (error) {
    console.error("❌ Error fetching recipes:", error);
    res.status(500).json({ error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    console.log(`🔍 [GET ONE] Request received: ${req.method} ${req.url}`);
    console.log("🆔 Recipe ID:", req.params.id);

    const recipe = await FoodRecipe.findById(req.params.id).populate(
      "createdBy",
      "name email"
    ); // Populating the createdBy field with email

    if (!recipe) {
      console.log("⚠️ Recipe not found");
      return res.status(404).json({ message: "Recipe not found" });
    }

    console.log("✅ Recipe found:", recipe);
    res.status(200).json(recipe);
  } catch (error) {
    console.error("❌ Error fetching recipe:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    console.log(`✏️ [UPDATE] Request received: ${req.method} ${req.url}`);
    console.log("🆔 Recipe ID:", req.params.id);
    console.log("📝 Updated Data:", req.body);

    const updatedRecipe = await FoodRecipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedRecipe) {
      console.log("⚠️ Recipe not found");
      return res.status(404).json({ message: "Recipe not found" });
    }

    console.log("✅ Recipe updated:", updatedRecipe);
    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error("❌ Error updating recipe:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    console.log(`🗑️ [DELETE] Request received: ${req.method} ${req.url}`);
    console.log("🆔 Recipe ID:", req.params.id);

    const deletedRecipe = await FoodRecipe.findByIdAndDelete(req.params.id);

    if (!deletedRecipe) {
      console.log("⚠️ Recipe not found");
      return res.status(404).json({ message: "Recipe not found" });
    }

    console.log("✅ Recipe deleted:", deletedRecipe);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting recipe:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Export all functions using module.exports
module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
