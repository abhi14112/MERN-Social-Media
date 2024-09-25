import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { login, register, logoutUser,getUsers, updateUser, getUserProfile, followUnfollowUser } from "../controllers/userController.js";
const router = express.Router();
router.get("/profile/:query", getUserProfile);
router.post("/signup", register);
router.get("/tofollow",protectRoute,getUsers);
router.post("/login", login);
router.post("/logout", logoutUser)
router.put("/follow/:id", protectRoute, followUnfollowUser);
router.put("/update/:id", protectRoute, updateUser);
router.get("/getuser",getUserProfile);
export default router;