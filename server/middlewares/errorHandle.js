function errorHandle(err, req, res, next) {
  console.error("Error caught by middleware:", err);

  const errorMap = {
    BadRequest: { status: 400 },
    SequelizeValidationError: {
      status: 400,
      message:
        Array.isArray(err.errors) && err.errors.length
          ? err.errors.map((e) => e.message)
          : "Validation Error",
    },
    SequelizeUniqueConstraintError: {
      status: 400,
      message:
        Array.isArray(err.errors) && err.errors.length
          ? err.errors.map((e) => e.message)
          : "Unique Constraint Error",
    },
    Unauthenticated: { status: 401, message: "Invalid Token" },
    JsonWebTokenError: { status: 401, message: "Invalid Token" },
    Unauthorized: { status: 401, message: "Invalid Email / Password" },
    Forbidden: { status: 403, message: "You are not authorized" },
    NotFound: { status: 404, message: "Data not found" },
    MulterError: { status: 400, message: "File upload failed" },
    SyntaxError:
      err.type === "entity.parse.failed"
        ? { status: 400, message: "Invalid JSON format" }
        : undefined,
  };

  const { status = 500, message = "Internal Server Error" } =
    errorMap[err.name] || {};

  res.status(status).json({ message });
}

module.exports = errorHandle;
