import type { Request, Response } from "express";
import { Event } from "../models/event.model";
import slugify from "slugify";

export async function handleCreateEvent(req: Request, res: Response) {
  const { title, description, location, author, date, time } = req.body;
  const file = req.file;

  if (!title || !description || !author || !file) {
    return res.status(403).json({ message: "Please fill the title, description, author and file fields!" });
  }

  try {
    const newEvent = new Event({
      title,
      slug: slugify(title, { lower: true }),
      description,
      location,
      author,
      date,
      time,
      coverImage: file?.filename,
    });
    const savedEvent = await newEvent.save();

    return res.status(201).json({ message: "Creating event success!", data: savedEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating event!" });
  }
}

export async function handleGetEvents(_: Request, res: Response) {
  try {
    const allEvents = await Event.find().populate({ path: "author", select: "firstName lastName email avatarUrl" });

    if (allEvents.length === 0) return res.status(200).json({ message: "There is no events", data: allEvents });

    return res.status(200).json({ message: "All events fetched successfully", data: allEvents });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function handleGetSingleEvent(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const singleEvent = await Event.findById(id).populate({ path: "author", select: "firstName lastName email avatarUrl" });
    if (!singleEvent) return res.status(404).json({ message: "Event not found" });

    return res.status(200).json({ message: "Single event fetched successfully", data: singleEvent });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function handleUpdateEvent(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description, author, date, time } = req.body;

  try {
    const event = await Event.findByIdAndUpdate(id, { title, description, author, date, time });

    if (!event) return res.status(404).json({ message: "Event not found" });

    return res.status(200).json({ message: `Event ${id} updated successfully` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function handleDeleteEvent(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const event = await Event.findByIdAndDelete(id);

    if (!event) return res.status(404).json({ message: "Event might already deleted, not found" });

    return res.status(200).json({ message: "Event delete success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

export async function handleJoinEvent(req: Request, res: Response) {
  const { id } = req.params;
  const { name, email, phoneNumber, age, gender } = req.body;

  try {
    await Event.findByIdAndUpdate(id, { $push: { participants: { name, email, phoneNumber, age, gender } } }, { new: true });
    return res.status(200).json({ message: "Participant registered" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
}
