import User from "../models/user.model";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/tokenAndCookie.js";
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
        if(user){
            generateTokenAndSetCookie(user._id,res);
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
    res.cookie('jwt','',{
        httpOnly:true,
        expiresIn:new Date(0)
    });
    return res.status(200).json({
        message:"Logged out successfully"
    });
}
export { login, register, logoutUser };