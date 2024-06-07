import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";
import jwt from "jsonwebtoken";

//create new user
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return next(new Error("Users already exists :/"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookies(user, res, "created user", 201);
  } catch (error) {
    next(error);
  }
};

//login
export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new Error("Invalid password or email"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(new Error("Invalid password or email"));

    sendCookies(user, res, `welcome back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("+password");
    res.json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

//get user by details
export const getMyDetails = (req, res) => {
  res.json({
    user: req.user,
  });
};

export const userLogout = (req, res) => {
  res
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      message: "Logged out",
    });
};
