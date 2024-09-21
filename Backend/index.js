import express from "express";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const app  = express();

app.use(express.json({limit:"50mb"}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

const PORT =  process.env.PORT;
app.use("/api/users",userRoutes);
app.listen(PORT,()=>{
    console.log(`Server is running at post ${PORT}`);
})