"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
exports.authRouter = (0, express_1.default)();
exports.authRouter.post("/api/register", auth_controller_1.handleRegister);
exports.authRouter.post("/api/login", auth_controller_1.handleLogin);
