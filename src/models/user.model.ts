import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  avatarUrl: String,
});

export const User = mongoose.model("User", userSchema);
