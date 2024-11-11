import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectMongoDB from "./db/connectMongoDb.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use("/api/auth" , authRoutes);

app.listen(PORT, ()=>{
    console.log(`Server Running On PORT ${PORT}`);
    connectMongoDB();
})