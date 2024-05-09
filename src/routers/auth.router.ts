import express from "express";
import { handleLogin, handleRegister } from "../controllers/auth.controller";

export const authRouter = express();

authRouter.post("/register", handleRegister);
authRouter.post("/login", handleLogin);
