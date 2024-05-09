import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routers/auth.router";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(authRouter);

app.listen(port);
