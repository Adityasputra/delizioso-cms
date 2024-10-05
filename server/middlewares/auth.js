const { verifyToken } = require("../helpers/jwtHelper");
const { User, Cuisine } = require("../models");

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
    console.log(error, "This Error Authentcation");
    next(error);
  }
};

const authorization = async (req, res, next) => {
  try {
    const { CuisineId } = req.params;

    const cuisine = await Cuisine.findByPk(CuisineId);
    if (!cuisine) throw { name: "NotFound" };

    if (req.user.role === "staff" && cuisine.authorId !== cuisine.UserId)
      throw { name: "Forbidden" };

    next();
  } catch (error) {
    console.log(error, "This Error Authorization");
    next(error);
  }
};

const checkRoleUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") throw { name: "Forbidden" };
    next();
  } catch (error) {
    console.log(error, "This Error Check Role");
    next(error);
  }
};

module.exports = {
  authentication,
  authorization,
  checkRoleUser,
};
