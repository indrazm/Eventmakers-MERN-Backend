import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRouter } from "./routers/auth.router";
import { eventRouter } from "./routers/event.router";
import { API_URL } from "./config/apiUrl";

dotenv.config();
mongoose.connect(process.env.MONGODB_URL as string);

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static("public"));

app.use(API_URL, authRouter);
app.use(API_URL, eventRouter);

app.listen(port);

console.log("API Eventmakers running...");
