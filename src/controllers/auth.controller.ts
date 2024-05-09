import type { Request, Response } from "express";
import { User } from "../models/user.model";
import argon from "argon2";

export async function handleRegister(req: Request, res: Response) {
  const { firstName, lastName, email, password } = req.body;
  const hashPassword = await argon.hash(password);

  return res.json({ message: "Hello!" });
}
