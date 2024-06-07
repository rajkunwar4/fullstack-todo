import jwt from "jsonwebtoken";
import { User } from "../models/users.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.json({
      message: "Login first",
    });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded._id);
  req.user = user;

  next();
};
