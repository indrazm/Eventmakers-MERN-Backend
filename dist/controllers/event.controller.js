"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteEvent = exports.handleUpdateEvent = exports.handleGetSingleEvent = exports.handleGetEvents = exports.handleCreateEvent = void 0;
const event_model_1 = require("../models/event.model");
async function handleCreateEvent(req, res) {
    const { title, description, author, date, time } = req.body;
    const file = req.file;
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
    const allEvents = await event_model_1.Event.find().populate({ path: "author", select: "firstName lastName email avatarUrl" });
    return res.status(200).json({ message: "All events fetched successfully", data: allEvents });
}
exports.handleGetEvents = handleGetEvents;
async function handleGetSingleEvent(req, res) {
    const { id } = req.params;
    const singleEvent = await event_model_1.Event.findById(id).populate({ path: "author", select: "firstName lastName email avatarUrl" });
    return res.status(200).json({ message: "Single event fetched successfully", data: singleEvent });
}
exports.handleGetSingleEvent = handleGetSingleEvent;
async function handleUpdateEvent(req, res) {
    const { id } = req.params;
    const { title, description, author, date, time } = req.body;
    try {
        await event_model_1.Event.findByIdAndUpdate(id, { title, description, author, date, time });
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
    await event_model_1.Event.findByIdAndDelete(id);
    return res.status(200).json({ message: "Event delete success!" });
}
exports.handleDeleteEvent = handleDeleteEvent;
