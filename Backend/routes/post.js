import express from "express";
import {
    createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts,getNewPosts
} from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();
router.get("/feed", getFeedPosts);
router.get("/new", protectRoute, getNewPosts);
router.post("/create",protectRoute, createPost);
router.get("/:id", getPost);
router.delete("/:id", protectRoute, deletePost);
router.put("/like/:id", protectRoute, likeUnlikePost);
router.put("/reply/:id", protectRoute, replyToPost);
export default router;