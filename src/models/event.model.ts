import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  coverImage: String,
  location: String,
  date: Date,
  time: TimeRanges,
  author: { type: mongoose.Types.ObjectId, ref: "User" },
});

export const Event = mongoose.model("Event", eventSchema);
