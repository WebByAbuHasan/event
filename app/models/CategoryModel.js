import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
    {
        categoryName: { type: String, required: true },
    },
    { timestamps: true, versionKey: false }
);
export const CategoryModel= mongoose.model("category", categorySchema);
export default CategoryModel;
