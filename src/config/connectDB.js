const mongoose = require("mongoose");
const AppError = require("../errors/AppError");
const error = require("../errors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected...");
  } catch (err) {
    throw new AppError(error.DB_CONNECTION_FAILED);
  }
};

module.exports = connectDB;
