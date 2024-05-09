"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("../libs/storage");
const event_controller_1 = require("../controllers/event.controller");
const upload = (0, multer_1.default)({ storage: storage_1.storage });
exports.eventRouter = (0, express_1.default)();
exports.eventRouter.post("/api/events", upload.single("coverImage"), event_controller_1.handleCreateEvent);
exports.eventRouter.get("/api/events", event_controller_1.handleGetEvents);
exports.eventRouter.get("/api/events/:id", event_controller_1.handleGetSingleEvent);
exports.eventRouter.patch("/api/events/:id", upload.single("coverImage"), event_controller_1.handleUpdateEvent);
exports.eventRouter.delete("/api/events/:id", event_controller_1.handleDeleteEvent);
exports.eventRouter.post("/api/events/:id/join", event_controller_1.handleJoinEvent);
