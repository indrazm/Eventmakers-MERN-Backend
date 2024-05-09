import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  coverImage: String,
  location: String,
  date: String,
  time: String,
  author: { type: mongoose.Types.ObjectId, ref: "User" },
});

export const Event = mongoose.model("Event", eventSchema);
