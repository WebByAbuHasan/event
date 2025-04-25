import CategoryModel from "../models/CategoryModel.js";

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const {categoryName} = req.body;
        if (!categoryName ) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newCategory = new CategoryModel({ categoryName});
        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//
// // Update a category by ID
// export const updateCategory = async (req, res) => {
//     try {
//         const updatedCategory = await CategoryModel.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true, runValidators: true }
//         );
//
//         if (!updatedCategory) {
//             return res.status(404).json({ error: "Category not found" });
//         }
//
//         res.status(200).json(updatedCategory);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
//
// // Delete a category by ID
// export const deleteCategory = async (req, res) => {
//     try {
//         const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id);
//         if (!deletedCategory) {
//             return res.status(404).json({ error: "Category not found" });
//         }
//         res.status(200).json({ message: "Category deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
