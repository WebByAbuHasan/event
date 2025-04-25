import mongoose from "mongoose";
import eventModels from "../models/eventModels.js";

// Helper function to check if a string is a valid MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getEventByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;
        console.log("Received categoryId:", categoryId);

        if (!isValidObjectId(categoryId)) {
            return res.status(400).json({ error: "Invalid categoryId format" });
        }

        const events = await eventModels.find({ categoryId: new mongoose.Types.ObjectId(categoryId) });

        if (events.length === 0) {
            return res.status(404).json({ message: "No events found for this category" });
        }

        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events by categoryId:", error);
        res.status(500).json({ message: "Failed to fetch events", error: error.message });
    }
};