const User = require("../models/user.model");

const errors = require("../errors");
const AppError = require("../errors/AppError");

const handleSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw AppError(errors.VALIDATION_ERROR);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError(errors.USER_ALREADY_EXISTS);
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  handleSignup,
};
