const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    console.log(`🔑 [AUTH] Checking token for ${req.method} ${req.url}`);

    let token = req.headers["authorization"];
    if (!token) {
      console.log("⚠️ No token provided");
      return res.status(400).json({ message: "Token is required" });
    }

    if (!token.startsWith("Bearer ")) {
      console.log("⚠️ Token format incorrect");
      return res.status(400).json({ message: "Invalid token format" });
    }

    token = token.split(" ")[1]; // Extract the actual token

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("❌ Token verification failed:", err.message);
        return res.status(401).json({ message: "Unauthorized access" });
      }

      console.log("✅ Token verified successfully:", decoded);
      req.user = decoded; // Attach user data to request
      next(); // Move to next middleware
    });
  } catch (error) {
    console.error("❌ Error in verifyToken middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyToken;
