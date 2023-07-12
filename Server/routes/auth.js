import express from "express";
import { login, register } from "../controllers/auth.js";
import validateDetails from "../middleware/auth.js";

const router=express.Router();

router.route("/signup")
.post(validateDetails,register)
router.route("/login")
.post(login)

export default router;