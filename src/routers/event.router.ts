import express from "express";
import multer from "multer";
import { storage } from "../libs/storage";
import {
  handleCreateEvent,
  handleDeleteEvent,
  handleGetEvents,
  handleGetSingleEvent,
  handleJoinEvent,
  handleUpdateEvent,
} from "../controllers/event.controller";

const upload = multer({ storage });

export const eventRouter = express();

eventRouter.post("/api/events", upload.single("coverImage"), handleCreateEvent);
eventRouter.get("/api/events", handleGetEvents);
eventRouter.get("/api/events/:id", handleGetSingleEvent);
eventRouter.patch("/api/events/:id", upload.single("coverImage"), handleUpdateEvent);
eventRouter.delete("/api/events/:id", handleDeleteEvent);

eventRouter.post("/api/events/:id/join", handleJoinEvent);
