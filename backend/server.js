import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectMongoDB from "./db/connectMongoDb.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended : true})) // to parse form data
app.use(cookieParser());
app.use("/api/auth" , authRoutes);
app.use("/api/users" , userRoutes);

app.listen(PORT, ()=>{
    console.log(`Server Running On PORT ${PORT}`);
    connectMongoDB();
})