const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET);
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다",
    });
  }
};
module.exports = verifyToken;
