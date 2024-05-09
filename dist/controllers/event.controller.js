"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteEvent = exports.handleUpdateEvent = exports.handleGetSingleEvent = exports.handleGetEvents = exports.handleCreateEvent = void 0;
const event_model_1 = require("../models/event.model");
async function handleCreateEvent(req, res) {
    const { title, description, author, date, time } = req.body;
    const file = req.file;
    if (!title || !description || !author || !file) {
        return res.status(403).json({ message: "Please fill the title, description, author and file fields!" });
    }
    try {
        const newEvent = new event_model_1.Event({
            title,
            description,
            author,
            date,
            time,
            coverImage: file?.filename,
        });
        const savedEvent = await newEvent.save();
        return res.status(201).json({ message: "Creating event success!", data: savedEvent });
    }
    catch (error) {
        return res.status(500).json({ message: "Error creating event!" });
    }
}
exports.handleCreateEvent = handleCreateEvent;
async function handleGetEvents(_, res) {
    try {
        const allEvents = await event_model_1.Event.find().populate({ path: "author", select: "firstName lastName email avatarUrl" });
        if (allEvents.length === 0)
            return res.status(200).json({ message: "There is no events", data: allEvents });
        return res.status(200).json({ message: "All events fetched successfully", data: allEvents });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
exports.handleGetEvents = handleGetEvents;
async function handleGetSingleEvent(req, res) {
    const { id } = req.params;
    try {
        const singleEvent = await event_model_1.Event.findById(id).populate({ path: "author", select: "firstName lastName email avatarUrl" });
        if (!singleEvent)
            return res.status(404).json({ message: "Event not found" });
        return res.status(200).json({ message: "Single event fetched successfully", data: singleEvent });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}
exports.handleGetSingleEvent = handleGetSingleEvent;
async function handleUpdateEvent(req, res) {
    const { id } = req.params;
    const { title, description, author, date, time } = req.body;
    try {
        const event = await event_model_1.Event.findByIdAndUpdate(id, { title, description, author, date, time });
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        return res.status(200).json({ message: `Event ${id} updated successfully` });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
exports.handleUpdateEvent = handleUpdateEvent;
async function handleDeleteEvent(req, res) {
    const { id } = req.params;
    try {
        const event = await event_model_1.Event.findByIdAndDelete(id);
        if (!event)
            return res.status(404).json({ message: "Event might already deleted, not found" });
        return res.status(200).json({ message: "Event delete success!" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
}
exports.handleDeleteEvent = handleDeleteEvent;
