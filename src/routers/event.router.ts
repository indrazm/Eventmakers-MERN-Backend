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

eventRouter.post("/events", upload.single("coverImage"), handleCreateEvent);
eventRouter.get("/events", handleGetEvents);
eventRouter.get("/events/:id", handleGetSingleEvent);
eventRouter.patch("/events/:id", upload.single("coverImage"), handleUpdateEvent);
eventRouter.delete("/events/:id", handleDeleteEvent);

eventRouter.post("/events/:id/join", handleJoinEvent);
