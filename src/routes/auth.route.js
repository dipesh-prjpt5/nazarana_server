const express = require("express");
const {
  handleLogin,
  handleRegister,
  handleAuthCheck,
} = require("../controllers/auth.controller");

const verifyToken = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", handleRegister);

router.post("/login", handleLogin);

router.post("/check", verifyToken, handleAuthCheck);

module.exports = router;
