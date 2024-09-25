import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Post from "../models/post.model.js";
import generateTokenAndSetCookie from "../utils/tokenAndCookie.js";
import mongoose from "mongoose";

const getUserProfile = async (req, res) => {
    const { query } = req.params;
    try {
        let user;
        if (mongoose.Types.ObjectId.isValid(query)) {
            // Find user by ID and populate followers and following
            user = await User.findOne({ _id: query })
                .select("-password")
                .populate('followers', 'username profilePic')
                .populate('following', 'username profilePic');
        } else {
            // Find user by username and populate followers and following
            user = await User.findOne({ username: query })
                .select("-password")
                .populate('followers', 'username profilePic')
                .populate('following', 'username profilePic');
        }

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const userId = req.user._id; 
        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const users = await User.aggregate([
            {
                $match: {
                    _id: { $nin: currentUser.following.concat([userId]) } 
                }
            },
            {
                $sample: { size: 5 } 
            },
            {
                $project: { password: 0 } 
            }
        ]);

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({
                error: "Invalid username or password"
            });
        }
        generateTokenAndSetCookie(user._id, res);
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePic: user.profilePic
        })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const register = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        const user = await User.create({
            name,
            email,
            password,
            username
        });
        if (user) {
            generateTokenAndSetCookie(user._id, res);
        }
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expiresIn: new Date(0)
    });
    return res.status(200).json({
        message: "Logged out successfully"
    });
}

const updateUser = async (req, res) => {
    const { name, email, username, password, bio } = req.body;
    let { profilePic } = req.body;
    const userId = req.user._id;
    try {
        let user = await User.findById(userId);
        if (!user) return res.status(400).json({ error: "User not found" });
        if (req.params.id !== userId.toString()) return res.status(400).json({ error: "You cannot update other user's profile" });

        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;
        if (password) {
            user.password = password;
        }
        user = await user.save();

        await Post.updateMany(
            { "replies.userId": userId },
            {
                $set: {
                    "replies.$[reply].username": user.username,
                    "replies.$[reply].userProfilePic": user.profilePic,
                },
            },
            {
                arrayFilters: [{ "reply.userId": userId }]
            }
        );
        user.password = null;
        return res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const followUnfollowUser = async (req, res) => {
    try {
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);
        if(id===req.user._id.toString()){
            return res.status(400).json({
                error:"you cannot follow/unfollow yourself"
            });
        }
        if(!userToModify || !currentUser){
            return res.status(400).json({
                error:"User not found"
            });
        }
        const isFollowing = currentUser.following.includes(id);

        if(isFollowing) {
            await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}});
            await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}});
            return res.status(200).json({message:"User unfollowed successfully"});
        }
        else {
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });

            res.status(200).json({ message: "User followed successfully" });
        }
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}
export { login, register,getUsers, logoutUser, getUserProfile, updateUser,followUnfollowUser };