const { verifyToken } = require("../helpers/jwtHelper");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const access_token = req.headers.authorization;
    if (!access_token) throw { name: "Unauthenticated" };

    const [type, token] = access_token.split(" ");
    if (type !== "Bearer") throw { name: "Unauthenticated" };

    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "Unauthenticated" };

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      imageUrl: user.imageUrl,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const authorization = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

