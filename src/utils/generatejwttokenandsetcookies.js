const jwt = require("jsonwebtoken");

const GenerateJwtTokenAndSetCookies = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  return token;
};

module.exports = GenerateJwtTokenAndSetCookies;
