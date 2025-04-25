import mongoose from "mongoose";

const MONGO_URI = `mongodb+srv://abu_hasan_123:abuhasan123@cluster0.8eazi.mongodb.net/event`; // Change this as needed
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI); // No need for deprecated options
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};
export default connectDB;
export const databaseProcess =async()=>{

}

