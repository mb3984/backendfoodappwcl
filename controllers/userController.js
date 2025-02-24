const usersData = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
  try {
    console.log("📌 [SIGNUP] Request received:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      console.log("⚠️ Missing email or password");
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    let user = await usersData.findOne({ email });
    if (user) {
      console.log("❌ Email already exists:", email);
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPwd = await bcryptjs.hash(password, 10);
    const newUser = await usersData.create({ email, password: hashedPwd });
    let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);

    console.log("✅ User signup successful:", newUser._id);
    res
      .status(201)
      .json({ message: "Signup successful", user: newUser, token });
  } catch (error) {
    console.error("❌ Error in userSignUp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    console.log("📌 [LOGIN] Request received:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      console.log("⚠️ Missing email or password");
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    let user = await usersData.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("❌ Invalid password attempt for:", email);
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log("✅ Login successful, Token generated:", token);

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("❌ Error in userLogin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    console.log(`📌 [GET USER] Fetching user: ${req.params.id}`);

    const user = await User.findById(req.params.id);
    if (!user) {
      console.log("❌ User not found:", req.params.id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User fetched successfully:", user._id);
    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error in getUser:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = { userSignUp, userLogin, getUser };
