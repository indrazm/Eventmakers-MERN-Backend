import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  gender: String,
  age: String,
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: String,
  coverImage: { type: String, required: true },
  location: { type: String, required: true },
  date: String,
  time: String,
  author: { type: mongoose.Types.ObjectId, ref: "User" },
  participants: [participantSchema],
});

export const Event = mongoose.model("Event", eventSchema);
