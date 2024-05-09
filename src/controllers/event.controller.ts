import type { Request, Response } from "express";
import { Event } from "../models/event.model";

export async function handleCreateEvent(req: Request, res: Response) {
  const { title, description, author, date, time } = req.body;
  const file = req.file;

  try {
    const newEvent = new Event({
      title,
      description,
      author,
      date,
      time,
      coverImage: file?.filename,
    });
    const savedEvent = await newEvent.save();

    return res.status(201).json({ message: "Creating event success!", data: savedEvent });
  } catch (error) {
    return res.status(500).json({ message: "Error creating event!" });
  }
}

export async function handleGetEvents(_: Request, res: Response) {
  const allEvents = await Event.find().populate({ path: "author", select: "firstName lastName email avatarUrl" });

  return res.status(200).json({ message: "All events fetched successfully", data: allEvents });
}

export async function handleGetSingleEvent(req: Request, res: Response) {
  const { id } = req.params;
  const singleEvent = await Event.findById(id).populate({ path: "author", select: "firstName lastName email avatarUrl" });

  return res.status(200).json({ message: "Single event fetched successfully", data: singleEvent });
}

export async function handleUpdateEvent(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description, author, date, time } = req.body;

  try {
    await Event.findByIdAndUpdate(id, { title, description, author, date, time });

    return res.status(200).json({ message: `Event ${id} updated successfully` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function handleDeleteEvent(req: Request, res: Response) {
  const { id } = req.params;

  await Event.findByIdAndDelete(id);

  return res.status(200).json({ message: "Event delete success!" });
}
