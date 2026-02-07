//Error reducer (core logic)

const errors = require("./index");

const defaultDetails = {
  status: 500,
  message: "Something went wrong!",
  logError: true,
};

module.exports = (err) => {
  switch (err.message) {
    case errors.CORS_ORIGIN:
      return {
        ...defaultDetails,
        status: 400,
        message: "Not allowed by CORS",
        logError: false,
      };

    case errors.UNAUTHORIZED:
      return {
        ...defaultDetails,
        status: 401,
        message: "Unauthorized access",
        logError: false,
      };

    case errors.FORBIDDEN:
      return {
        ...defaultDetails,
        status: 403,
        message: "Forbidden",
        logError: false,
      };

    case errors.VALIDATION_ERROR:
      return {
        ...defaultDetails,
        status: 422,
        message: "Invalid input data",
        logError: false,
      };

    case errors.USER_ALREADY_EXISTS:
      return {
        ...defaultDetails,
        status: 409,
        message: "User already exists",
        logError: false,
      };

    case errors.DB_CONNECTION_FAILED:
      return {
        ...defaultDetails,
        status: 500,
        message: "Database connection failed",
        logError: true,
      };

    case errors.NOT_FOUND:
      return {
        ...defaultDetails,
        status: 404,
        message: "Resource not found",
        logError: false,
      };

    case errors.default:
      return defaultDetails;
  }
};
