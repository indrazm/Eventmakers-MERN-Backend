"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const eventSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    coverImage: String,
    location: String,
    date: String,
    time: String,
    author: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
});
exports.Event = mongoose_1.default.model("Event", eventSchema);
