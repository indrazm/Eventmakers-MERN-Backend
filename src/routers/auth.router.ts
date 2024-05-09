import express from "express";
import { handleRegister } from "../controllers/auth.controller";

export const authRouter = express();

authRouter.get("/register", handleRegister);
authRouter.post("/login", () => {});
