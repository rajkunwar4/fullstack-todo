import express from "express";
import {
  createUser,
  getAllUsers,
  getMyDetails,
  userLogin,
  userLogout,
} from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const router = express.Router();

router.get("/all", getAllUsers);

router.get("/me",isAuthenticated,getMyDetails);

router.post("/new", createUser);

router.get('/logout',isAuthenticated,userLogout);


router.post('/login',userLogin);

// export default router;
