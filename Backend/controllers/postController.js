import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
const createPost = async (req, res) => {
    try {
        const { postedBy, text, img } = req.body;

        // Check required fields
        if (!postedBy || !text) {
            return res.status(400).json({ error: "PostedBy and text fields are required" });
        }
        if (!mongoose.Types.ObjectId.isValid(postedBy)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        // Find the user by ID (use findById instead of findOne)
        const user = await User.findById(postedBy);
        if (!user) {
            return res.status(404).json({ error: "User. not found" });
        }

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized to create post" });
        }

        const maxLength = 500;
        if (text.length > maxLength) {
            return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
        }

        // Create and save the new post
        const newPost = new Post({ postedBy, text, img });
        await newPost.save();

        return res.status(201).json(newPost); // Return the newly created post

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                error: "Unauthorized to delete post"
            });
        }
        // if (post.img) {
        // 	const imgId = post.img.split("/").pop().split(".")[0];
        // 	await cloudinary.uploader.destroy(imgId);
        // }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const likeUnlikePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const userId = req.user._id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        const userLikedPost = post.likes.includes(userId);

        if (userLikedPost) {
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            return res.status(200).json({ message: "Post unliked successfully" });
        } else {
            post.likes.push(userId);
            await post.save();
            return res.status(200).json({ message: "Post liked successfully" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const getFeedPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const following = user.following;
        const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

        return res.status(200).json(feedPosts);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
const getNewPosts = async (req, res) => {
    try {
        const latestPosts = await Post.find({})
            .sort({ createdAt: -1 }) // Sort by creation date in descending order
            .limit(20); // Limit the result to the latest 20 posts

        return res.status(200).json(latestPosts);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const replyToPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;
        const userProfilePic = req.user.userProfilePic;
        const username = req.user.username;
        if (!text) {
            return res.status(400).json({
                error: "Text field is required"
            });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        const reply = { userId, username: username, text, userProfilePic };

        post.replies.push(reply);
        await post.save();
        res.status(200).json(reply);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { createPost, getPost, deletePost,getNewPosts, likeUnlikePost, replyToPost, getFeedPosts };