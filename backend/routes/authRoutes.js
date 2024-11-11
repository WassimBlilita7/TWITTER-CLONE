import express from "express";
import { signup } from "../controllers/authController.js";
const router = express.Router();

router.get("/signup" , signup)








router.post("/login" , (req , res)=>{
    res.json({
        data : "You hit the Login endpoint",
    });
});









router.get("/logout" , (req , res)=>{
    res.json({
        data : "You hit the Logout endpoint",
    });
});

export default router;

