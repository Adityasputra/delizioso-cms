function errorHandle(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  console.error("Error caught by middleware:", err);

  switch (err.name) {
    case "BadRequest":
      status = 400;
      break;
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      if (err.errors && Array.isArray(err.errors)) {
        message = err.errors.map((er) => er.message);
      }
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
    case "MulterError":
      status = 400;
      message = "File upload failed";
      break;
    case "SyntaxError":
      if (err.type === "entity.parse.failed") {
        status = 400;
        message = "Invalid JSON format";
      }
      break;
  }

  res.status(status).json({ message });
}

module.exports = errorHandle;
