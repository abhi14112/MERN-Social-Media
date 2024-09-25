import express from "express";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db/connectDb.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT = process.env.PORT;
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running at port ${PORT}`);
})