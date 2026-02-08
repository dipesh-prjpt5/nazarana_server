const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      gologin: true,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.status(401).json({
      success: false,
      message: "Session expired or invalid token",
      gologin: true,
    });
  }
};

module.exports = verifyToken;
