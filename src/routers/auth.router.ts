import express from "express";
import { handleLogin, handleRegister } from "../controllers/auth.controller";

export const authRouter = express();

authRouter.post("/api/register", handleRegister);
authRouter.post("/api/login", handleLogin);
