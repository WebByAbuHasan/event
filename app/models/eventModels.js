import mongoose from "mongoose";
const eventSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        location: { type: String, required: true },
        category:{ type: String, required: true },
        description: { type: String, required: true, trim: true },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true, versionKey: false }
);

export const eventModel = mongoose.model("event", eventSchema);

export default eventModel;