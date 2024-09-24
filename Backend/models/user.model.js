import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, 'Name cannot be more than 50 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        minlength: [3, "Username must be at least 3 characters"],
        maxlength: [20, "Username cannot exceed 20 character"]
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password must be more than 6 characters long']
    },
    profilePic: {
        type: String,
        default: "",
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    bio: {
        type: String,
        maxlength: [160, "Bio cannot exceed 160 character"],
        default: ""
    }
}, { timestamps: true });
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
// userSchema.virtual('followingCount').get(function () {
//     return this.following.length;
// })
// userSchema.virtual('followersCount').get(function () {
//     return this.followers.length;
// })
const User = mongoose.model("User", userSchema);
export default User;