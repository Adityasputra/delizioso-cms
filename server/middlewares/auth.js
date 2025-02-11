const { verifyToken } = require("../helpers/jsonwebtoken");
const { User, Cuisine } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const access_token = req.headers.authorization;
    if (!access_token)
      throw { name: "Unauthenticated", message: "Access token is missing" };

    const tokenParts = access_token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer")
      throw { name: "Unauthenticated", message: "Invalid token format" };

    const token = tokenParts[1];
    console.log("🔹 Received Token:", token);

    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "Unauthenticated", message: "User not found" };

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      imageUrl: user.imageUrl,
    };

    console.log("✅ Authentication Success:", req.user);
    next();
  } catch (error) {
    console.error("❌ Authentication Error:", error);
    next(error);
  }
};

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) throw { name: "BadRequest", message: "Invalid ID format" };

    const cuisine = await Cuisine.findByPk(id);
    if (!cuisine) throw { name: "NotFound", message: "Cuisine not found" };

    if (req.user.role === "staff" && req.user.id !== cuisine.UserId)
      throw { name: "Forbidden", message: "You do not have permission" };

    console.log("✅ Authorization Success for User ID:", req.user.id);
    next();
  } catch (error) {
    console.error("❌ Authorization Error:", error);
    next(error);
  }
};

const checkRoleUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin")
      throw { name: "Forbidden", message: "Admin access required" };

    console.log("✅ User has Admin role:", req.user.username);
    next();
  } catch (error) {
    console.error("❌ Role Check Error:", error);
    next(error);
  }
};

module.exports = {
  authentication,
  authorization,
  checkRoleUser,
};
