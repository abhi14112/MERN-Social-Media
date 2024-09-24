import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        maxLength: 500,
        minLength: 1,
        trim: true
    },
    img: {
        type: String
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        ref: "User",
        default: []
    },
    replies: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: true
            },
            text: {
                type: String,
                required: true,
                maxLength: 500
            },
            userProfilePic: {
                type: String,
                default: ""
            },
            username: {
                type: String,
                default: "Anonymous"
            }
        }
    ]
}, { timestamps: true });
const Post = mongoose.model("Post", postSchema);
export default Post;