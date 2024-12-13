import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Your session has ended,you need to login" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
  req.userId = decoded.userId;
  next();
};
