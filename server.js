require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
const recipeRoutes = require("./routes/recipeRoutes");
const userRoutes = require("./routes/userRoutes");

// ✅ Connect to MongoDB
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("✅ Connected to MongoDB...");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};
connectDb();

// ✅ Configure CORS
const corsOptions = {
  origin: "*", // Change to frontend URL for security
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Register API Routes
app.use("/recipes", recipeRoutes);
app.use("/user", userRoutes);

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the backend food recipe app");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`);
});
