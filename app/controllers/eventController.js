import eventModel from "../models/eventModels.js";

// Create Event (only logged-in users)
export const createEvent = async (req, res) => {
    try {
        const { title, date, time, location, category, description ,categoryId } = req.body;
        // Validate required fields
        if (!title || !date || !time || !location || !category || !description || !categoryId) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // Create new event using logged-in user's ID
        const newEvent = new eventModel({title, date, time, location, category, description,categoryId, createdBy: req.user.id,});
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(500).json({ error: "Failed to create event" });
    }
};


// Get All Events
export const getAllEvents = async (req, res) => {
    try {
        const events = await eventModel.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

// Get Single Event by ID
export const getEventById = async (req, res) => {
    try {
        const event = await eventModel.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: 'Error getting event' });
    }
};


//  Update Event
export const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await eventModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedEvent){
            return res.status(404).json({ error: "event not found" });
        }
        res.status(200).json(updatedEvent);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
};

//  Delete Event
export const deleteEvent = async (req, res) => {
    try {
        const event = await eventModel.findByIdAndDelete(req.params.id);
        if (!event){
            return res.status(403).json({ error: 'Unauthorized' });
        }
        res.status(200).json({ message: "event deleted successfully" });

    } catch (err) {
        res.status(500).json({error: error.message });
    }
};