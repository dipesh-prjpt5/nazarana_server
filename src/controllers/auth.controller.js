const User = require("../models/user.model");

const generatejwttokenandsetcookies = require("../utils/generatejwttokenandsetcookies");

const handleRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "internal error",
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generatejwttokenandsetcookies(res, user._id);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: error, message: "internal error" });
  }
};

const handleAuthCheck = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.id,
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User Already Logged In" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: error, message: "internal error" });
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleAuthCheck,
};
