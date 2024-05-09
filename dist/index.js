"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_router_1 = require("./routers/auth.router");
const event_router_1 = require("./routers/event.router");
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGODB_URL);
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use(auth_router_1.authRouter);
app.use(event_router_1.eventRouter);
app.listen(port);
