"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogin = exports.handleRegister = void 0;
const user_model_1 = require("../models/user.model");
const argon2_1 = __importDefault(require("argon2"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function handleRegister(req, res) {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await argon2_1.default.hash(password);
    try {
        const newUser = new user_model_1.User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        console.log(savedUser);
        return res.status(201).json({ message: "User register success", data: savedUser });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.mongo.MongoServerError && error.code === 11000) {
            return res.status(409).json({ message: "Associated email already registered" });
        }
        return res.status(500).json({ message: "Something went wrong!" });
    }
}
exports.handleRegister = handleRegister;
async function handleLogin(req, res) {
    const { email, password } = req.body;
    const user = await user_model_1.User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await argon2_1.default.verify(user.password, password);
    if (!isPasswordValid) {
        return res.status(403).json({ message: "Invalid Password" });
    }
    const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatarUrl: user.avatarUrl,
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
    return res.cookie("token", token).json({ message: "User login success!", user: payload });
}
exports.handleLogin = handleLogin;
