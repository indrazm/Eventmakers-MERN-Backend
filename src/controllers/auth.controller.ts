import type { Request, Response } from "express";
import { User } from "../models/user.model";
import argon from "argon2";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export async function handleRegister(req: Request, res: Response) {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await argon.hash(password);

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return res.status(201).json({ message: "User register success", data: savedUser });
  } catch (error) {
    if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
      return res.status(409).json({ message: "Associated email already registered" });
    }
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

export async function handleLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await argon.verify(user.password as string, password);
  if (!isPasswordValid) {
    return res.status(403).json({ message: "Invalid Password" });
  }

  const payload = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatarUrl: user.avatarUrl,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string);

  return res.cookie("token", token).json({ message: "User login success!", user: payload });
}
