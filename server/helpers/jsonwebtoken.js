const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}

const signInToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = {
  signInToken,
  verifyToken,
};
