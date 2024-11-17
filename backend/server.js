import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import connectMongoDB from "./db/connectMongoDb.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute.js";
import postRoutes from "./routes/postRoute.js";
import notificationsRoutes from "./routes/notificationRoute.js"
import {v2 as cloudinary} from "cloudinary";

dotenv.config();
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended : true})) // to parse form data
app.use(cookieParser());
app.use("/api/auth" , authRoutes);
app.use("/api/users" , userRoutes);
app.use("/api/posts" , postRoutes);
app.use("/api/notifications" , notificationsRoutes);

app.listen(PORT, ()=>{
    console.log(`Server Running On PORT ${PORT}`);
    connectMongoDB();
})