function errorHandle(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  switch (err.name) {
    case "BadRequest":
      status = 400;
      break;
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.error.errors.map((er) => err.message);
      break;
    case "Unauthenticated":
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;
    case "Unauthorized":
      status = 401;
      message = "Invalid Email / Password";
      break;
    case "Forbidden":
      status = 403;
      message = "You are not authorized";
      break;
    case "NotFound":
      status = 404;
      message = "Data not found";
      break;
  }

  res.status(status).json({ message });
}

module.exports = errorHandle;
