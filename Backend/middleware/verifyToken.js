const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeader = await req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403).json({ message: "Login First" });
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = verifyToken;
